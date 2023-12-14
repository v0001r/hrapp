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
exports.ApplyLeaveService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const apply_leave_repository_1 = require("./apply-leave.repository");
let ApplyLeaveService = class ApplyLeaveService {
    constructor(applyLeaveModel, staffModel, applyLeaveRepository, eventEmitter) {
        this.applyLeaveModel = applyLeaveModel;
        this.staffModel = staffModel;
        this.applyLeaveRepository = applyLeaveRepository;
        this.eventEmitter = eventEmitter;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.APPLY_LEAVE_CACHE_KEY}_${params._id.toString()}`;
        const leave = await this.applyLeaveRepository.findOne(params, projection);
        if (!leave)
            throw new common_1.NotFoundException();
        return leave;
    }
    async create(createDto) {
        try {
            const leaveCreated = await this.applyLeaveRepository.create({ ...createDto });
            if (!leaveCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async find(params = {}) {
        let options = {};
        if (params.s) {
            options.$or = [
                { name: new RegExp(params.s.toString(), 'i') },
                { code: new RegExp(params.s.toString(), 'i') },
            ];
        }
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
        if (params.sortBy) {
            sort[params.sortBy] = params.sortDir || 'asc';
        }
        const query = this.applyLeaveModel.find(options).populate('employee').sort(sort);
        if (params.page) {
            const page = parseInt(params.page) || 1;
            const limit = parseInt(params.limit) || 10;
            const items = await query.skip((page - 1) * limit).limit(limit).exec();
            const count = await this.applyLeaveRepository.count(options);
            return {
                items,
                count
            };
        }
        return await query.exec();
    }
    async update(id, updateDto) {
        const leaveData = await this.applyLeaveRepository.findOne({ _id: id });
        if (!leaveData) {
            throw new common_1.NotFoundException();
        }
        const leave = await this.applyLeaveRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!leave)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async delete(id) {
        const leave = await this.applyLeaveRepository.findOne({ _id: id });
        if (!leave)
            throw new common_1.NotFoundException();
        const deleted = await this.applyLeaveRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
};
exports.ApplyLeaveService = ApplyLeaveService;
exports.ApplyLeaveService = ApplyLeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ApplyLeave')),
    __param(1, (0, common_1.Inject)('Staff')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        apply_leave_repository_1.ApplyLeaveRepository,
        event_emitter_1.EventEmitter2])
], ApplyLeaveService);
//# sourceMappingURL=apply-leave.service.js.map