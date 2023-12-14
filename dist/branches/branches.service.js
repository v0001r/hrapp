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
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const branches_repository_1 = require("./branches.repository");
const redis_service_1 = require("../redis/redis.service");
let BranchesService = class BranchesService {
    constructor(branchModel, staffModel, branchRepository, eventEmitter, redisService) {
        this.branchModel = branchModel;
        this.staffModel = staffModel;
        this.branchRepository = branchRepository;
        this.eventEmitter = eventEmitter;
        this.redisService = redisService;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.BRANCHES_CACHE_KEY}_${params._id.toString()}`;
        const branch = await this.branchModel.find({ _id: params._id }).populate('branch_head').exec();
        if (!branch)
            throw new common_1.NotFoundException();
        return branch;
    }
    async create(createDto) {
        let branch;
        branch = await this.branchRepository.getByName(createDto.name);
        if (branch) {
            throw new common_1.ConflictException('Branch with given name already exists');
        }
        try {
            const branchCreated = await this.branchRepository.create({ ...createDto });
            if (!branchCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async handlebranchsCreatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.BRANCHES_CACHE_KEY);
    }
    async find(params = {}) {
        const { s, filters, city, state, country, sortBy, sortDir, page, limit, status } = params;
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
        if (city) {
            options.city = city;
        }
        if (status) {
            options.status = status;
        }
        if (state) {
            options.state = state;
        }
        if (country) {
            options.country = country;
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.branchModel.find(options).populate('branch_head').sort(sort);
        if (page) {
            const pageValue = parseInt(page) || 1;
            const limitValue = parseInt(limit) || 10;
            const skipCount = (pageValue - 1) * limitValue;
            const items = await query.skip(skipCount).limit(limitValue).exec();
            const count = await this.branchRepository.count(options);
            return { items, count };
        }
        const items = await query.exec();
        return items;
    }
    async update(id, updateDto) {
        const branchData = await this.branchRepository.findOne({ _id: id });
        if (!branchData) {
            throw new common_1.NotFoundException();
        }
        const branch = await this.branchRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!branch)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handlebranchUpdatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.BRANCHES_CACHE_KEY);
    }
    async delete(id) {
        const branch = await this.branchRepository.findOne({ _id: id });
        if (!branch)
            throw new common_1.NotFoundException();
        const deleted = await this.branchRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handlebranchDeletedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.BRANCHES_CACHE_KEY);
    }
};
exports.BranchesService = BranchesService;
__decorate([
    (0, event_emitter_1.OnEvent)('branch.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BranchesService.prototype, "handlebranchsCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('branch.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BranchesService.prototype, "handlebranchUpdatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('branch.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BranchesService.prototype, "handlebranchDeletedEvent", null);
exports.BranchesService = BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Branch')),
    __param(1, (0, common_1.Inject)('Staff')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        branches_repository_1.BranchRepository,
        event_emitter_1.EventEmitter2,
        redis_service_1.RedisService])
], BranchesService);
//# sourceMappingURL=branches.service.js.map