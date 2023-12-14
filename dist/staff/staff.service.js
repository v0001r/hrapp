"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const s3_files_service_1 = require("../files/s3-files.service");
const redis_service_1 = require("../redis/redis.service");
const staff_repository_1 = require("./staff.repository");
let StaffService = class StaffService {
    constructor(staffModel, branchModel, teamModel, roleModel, departmentModel, designationModel, staffRepository, s3FilesService, eventEmitter, redisService) {
        this.staffModel = staffModel;
        this.branchModel = branchModel;
        this.teamModel = teamModel;
        this.roleModel = roleModel;
        this.departmentModel = departmentModel;
        this.designationModel = designationModel;
        this.staffRepository = staffRepository;
        this.s3FilesService = s3FilesService;
        this.eventEmitter = eventEmitter;
        this.redisService = redisService;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.STAFF_CACHE_KEY}_${params._id.toString()}`;
        const staff = await this.staffRepository.findOne(params, projection);
        if (!staff)
            throw new common_1.NotFoundException();
        return staff;
    }
    async create(createDto, file) {
        let staff;
        staff = await this.staffRepository.getByEmail(createDto.email);
        if (staff) {
            throw new common_1.ConflictException('Staff with given email already exists');
        }
        staff = await this.staffRepository.getByPhone(createDto.phone);
        if (staff) {
            throw new common_1.ConflictException('Staff with given phone already exists');
        }
        if (file)
            var image = await this.s3FilesService.upload(file.buffer, file.originalname, file.mimetype);
        try {
            if (image) {
                var staffCreated = await this.staffRepository.create({
                    ...createDto,
                    image,
                });
            }
            else {
                var staffCreated = await this.staffRepository.create({
                    ...createDto,
                });
            }
            if (!staffCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true, staff: staffCreated };
        }
        catch (error) {
            console.log(error);
        }
    }
    async handlestaffsCreatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.STAFF_CACHE_KEY);
    }
    async find(params = {}) {
        const { s, filters, city, state, country, sortBy, sortDir, page, limit, branch_id, team_id, reporting_to, shift_id, department_id, role, status, designation } = params;
        const options = {};
        if (s) {
            options.$or = [
                { first_name: new RegExp(s, 'i') },
                { middle_name: new RegExp(s, 'i') },
                { first_name: new RegExp(s, 'i') },
                { last_name: new RegExp(s, 'i') },
                { email: new RegExp(s, 'i') },
                { phone: new RegExp(s, 'i') },
            ];
        }
        if (filters && (filters.dateFrom || filters.dateTo)) {
            options.createdAt = {
                $gt: new Date(filters.dateFrom || '1970-01-01'),
                $lt: filters.dateTo ? new Date(filters.dateTo) : new Date()
            };
        }
        if (city) {
            options.city = city;
        }
        if (state) {
            options.state = state;
        }
        if (country) {
            options.country = country;
        }
        if (branch_id) {
            options.branch_id = branch_id;
        }
        if (team_id) {
            options.team_id = team_id;
        }
        if (department_id) {
            options.department_id = department_id;
        }
        if (shift_id) {
            options.shift_id = shift_id;
        }
        if (designation) {
            options.designation = designation;
        }
        if (reporting_to) {
            options.reporting_to = reporting_to;
        }
        if (role) {
            options.role = role;
        }
        if (status) {
            options.status = status;
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.staffModel.find(options).populate('team_id', '_id name code').populate('designation', '_id name code').populate('branch_id', '_id name code').populate('role', '_id name').populate('primary_reporting', '_id salutation first_name middle_name last_name email phone').populate('secondary_reporting', '_id salutation first_name middle_name last_name email phone').populate('department_id').sort(sort);
        if (page) {
            const pageValue = parseInt(page) || 1;
            const limitValue = parseInt(limit) || 10;
            const skipCount = (pageValue - 1) * limitValue;
            const items = await query.skip(skipCount).limit(limitValue).exec();
            const count = await this.staffModel.countDocuments(options);
            return { items, count };
        }
        const items = await query.exec();
        return items;
    }
    async update(id, updateDto, file) {
        const staffData = await this.staffRepository.findOne({ _id: id });
        if (!staffData) {
            throw new common_1.NotFoundException();
        }
        if (file) {
            if (staffData.image)
                await this.s3FilesService.delete(staffData.image.key);
            staffData.image = await this.s3FilesService.upload(file.buffer, file.originalname, file.mimetype);
        }
        const staff = await this.staffRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!staff)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handlestaffUpdatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.STAFF_CACHE_KEY);
    }
    async delete(id) {
        const staff = await this.staffRepository.findOne({ _id: id });
        if (!staff)
            throw new common_1.NotFoundException();
        const deleted = await this.staffRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handlestaffDeletedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.STAFF_CACHE_KEY);
    }
    async deleteMany(ids) {
        await ids.forEach(async (id) => {
            const staff = await this.staffRepository.findOne({ _id: id });
            if (!staff)
                throw new common_1.NotFoundException();
        });
        await this.staffRepository.deleteMany({ _id: ids });
        return { success: true };
    }
    async handlestaffDeletedManyEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.STAFF_CACHE_KEY);
    }
    async conflicted(params = {}) {
    }
};
exports.StaffService = StaffService;
__decorate([
    (0, event_emitter_1.OnEvent)('staff.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffService.prototype, "handlestaffsCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('staff.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffService.prototype, "handlestaffUpdatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('staff.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffService.prototype, "handlestaffDeletedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('staff.deletedMany'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffService.prototype, "handlestaffDeletedManyEvent", null);
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Staff')),
    __param(1, (0, common_1.Inject)('Branch')),
    __param(2, (0, common_1.Inject)('Team')),
    __param(3, (0, common_1.Inject)('Role')),
    __param(4, (0, common_1.Inject)('Department')),
    __param(5, (0, common_1.Inject)('Designation')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        staff_repository_1.StaffRepository,
        s3_files_service_1.S3FilesService,
        event_emitter_1.EventEmitter2,
        redis_service_1.RedisService])
], StaffService);
//# sourceMappingURL=staff.service.js.map