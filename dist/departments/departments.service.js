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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("mongoose");
const cache_keys_constant_1 = require("../cache-keys.constant");
const departments_repository_1 = require("./departments.repository");
let DepartmentsService = class DepartmentsService {
    constructor(departmentModel, staffModel, departmentRepository, eventEmitter) {
        this.departmentModel = departmentModel;
        this.staffModel = staffModel;
        this.departmentRepository = departmentRepository;
        this.eventEmitter = eventEmitter;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.DEPARTMENT_CACHE_KEY}_${params._id.toString()}`;
        const department = await this.departmentModel.find({ _id: params._id }).populate('parent_department').populate('department_head').exec();
        if (!department)
            throw new common_1.NotFoundException();
        return department;
    }
    async create(createDto) {
        let department;
        department = await this.departmentRepository.getByName(createDto.name);
        if (department) {
            throw new common_1.ConflictException('department with given name already exists');
        }
        try {
            const departmentCreated = await this.departmentRepository.create({ ...createDto });
            if (!departmentCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async find(params = {}) {
        const { s, filters, department, sortBy, sortDir, page, limit, status } = params;
        const options = {};
        if (s) {
            options.$or = [
                { name: new RegExp(s, 'i') },
                { code: new RegExp(s, 'i') },
            ];
        }
        if (filters && (filters.dateFrom || filters.dateTo)) {
            options.createdAt = {
                $gt: new Date(filters.dateFrom || '1970-01-01'),
                $lt: filters.dateTo ? new Date(filters.dateTo) : new Date(),
            };
        }
        if (status) {
            options.status = status;
        }
        if (department) {
            options.parent_department = department;
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.departmentModel.find(options).populate('parent_department').populate('department_head').sort(sort);
        if (page) {
            const pageValue = parseInt(page) || 1;
            const limitValue = parseInt(limit) || 10;
            const skipCount = (pageValue - 1) * limitValue;
            const items = await query.skip(skipCount).limit(limitValue).exec();
            const count = await this.departmentRepository.count(options);
            return { items, count };
        }
        const items = await query.exec();
        return items;
    }
    async update(id, updateDto) {
        const departmentData = await this.departmentRepository.findOne({ _id: id });
        if (!departmentData) {
            throw new common_1.NotFoundException();
        }
        const department = await this.departmentRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!department)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async delete(id) {
        const department = await this.departmentRepository.findOne({ _id: id });
        if (!department)
            throw new common_1.NotFoundException();
        const deleted = await this.departmentRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Department')),
    __param(1, (0, common_1.Inject)('Staff')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        departments_repository_1.DepartmentRepository,
        event_emitter_1.EventEmitter2])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map