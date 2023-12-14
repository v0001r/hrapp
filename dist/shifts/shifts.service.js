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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const shift_repository_1 = require("./shift.repository");
const shift_assign_repository_1 = require("./shift-assign.repository");
let ShiftsService = class ShiftsService {
    constructor(shiftModel, staffModel, shiftassignModel, shiftRepository, shiftassignRepository, eventEmitter) {
        this.shiftModel = shiftModel;
        this.staffModel = staffModel;
        this.shiftassignModel = shiftassignModel;
        this.shiftRepository = shiftRepository;
        this.shiftassignRepository = shiftassignRepository;
        this.eventEmitter = eventEmitter;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.SHIFT_CACHE_KEY}_${params._id.toString()}`;
        const leave = await this.shiftRepository.findOne(params, projection);
        if (!leave)
            throw new common_1.NotFoundException();
        return leave;
    }
    async create(createDto) {
        let team;
        team = await this.shiftRepository.getByName(createDto.name);
        if (team) {
            throw new common_1.ConflictException('Shift with given name already exists');
        }
        try {
            const leaveCreated = await this.shiftRepository.create({ ...createDto });
            if (!leaveCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async find(params = {}) {
        const { s, from, to, sortBy, sortDir, page, limit, status } = params;
        const options = {};
        if (s) {
            options.$or = [
                { name: new RegExp(s, 'i') },
                { code: new RegExp(s, 'i') },
            ];
        }
        if (from && to) {
            options.from = {
                $gt: from,
            };
            options.to = {
                $lt: to,
            };
        }
        if (status) {
            options.status = status;
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.shiftModel.find(options).sort(sort);
        if (page) {
            const pageValue = parseInt(page) || 1;
            const limitValue = parseInt(limit) || 10;
            const skipCount = (pageValue - 1) * limitValue;
            const items = await query.skip(skipCount).limit(limitValue).exec();
            const count = await this.shiftRepository.count(options);
            return { items, count };
        }
        const items = await query.exec();
        return items;
    }
    async update(id, updateDto) {
        const leaveData = await this.shiftRepository.findOne({ _id: id });
        if (!leaveData) {
            throw new common_1.NotFoundException();
        }
        const leave = await this.shiftRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!leave)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async delete(id) {
        const leave = await this.shiftRepository.findOne({ _id: id });
        if (!leave)
            throw new common_1.NotFoundException();
        const shift = await this.shiftassignModel.find({ shift_id: id });
        if (shift)
            throw new common_1.ConflictException('Shift cant be deleted, it is alloted to employee or teams');
        const deleted = await this.shiftRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async deleteMany(ids) {
        await ids.forEach(async (id) => {
            const shifts = await this.shiftRepository.findOne({ _id: id });
            if (!shifts)
                throw new common_1.NotFoundException();
            const shift = await this.shiftassignModel.find({ shift_id: id });
            if (shift)
                throw new common_1.ConflictException('Shift cant be deleted, it is alloted to employee or teams');
        });
        await this.shiftRepository.deleteMany({ _id: ids });
        return { success: true };
    }
    async assign_shift(createDto) {
        const emps = this.staffModel.find({ team_id: createDto.team_id });
        (await emps).forEach(async (emp) => {
            const data = {
                "emp_id": emp._id,
                "team_id": createDto.team_id,
                "shift_id": createDto.shift_id,
                "start_date": createDto.start_date,
                "end_date": createDto.end_date
            };
            try {
                const shiftAssigned = await this.shiftassignRepository.create({ ...data });
                if (!shiftAssigned)
                    throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                return { success: true };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    async get_shifts(params = {}) {
        let options = {};
        if (params.filters) {
            if (params.filters.dateFrom || params.filters.dateTo) {
                options.createdAt = {
                    '$gt': new Date(params.filters.dateFrom || "1970-01-01"),
                    '$lt': params.filters.dateTo ? new Date(params.filters.dateTo) : new Date()
                };
            }
        }
        let sort = {
            createdAt: "desc"
        };
        const query = this.shiftassignModel.find(options).sort(sort);
        return await query.exec();
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Shift')),
    __param(1, (0, common_1.Inject)('Staff')),
    __param(2, (0, common_1.Inject)('Shiftassign')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        shift_repository_1.ShiftRepository,
        shift_assign_repository_1.ShiftassignRepository,
        event_emitter_1.EventEmitter2])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map