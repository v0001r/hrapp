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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const redis_service_1 = require("../redis/redis.service");
const teams_repository_1 = require("./teams.repository");
let TeamsService = class TeamsService {
    constructor(teamModel, staffModel, teamRepository, eventEmitter, redisService) {
        this.teamModel = teamModel;
        this.staffModel = staffModel;
        this.teamRepository = teamRepository;
        this.eventEmitter = eventEmitter;
        this.redisService = redisService;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.TEAM_CACHE_KEY}_${params._id.toString()}`;
        const team = this.teamModel.find({ _id: params._id }).populate('lead').exec();
        if (!team)
            throw new common_1.NotFoundException();
        return team;
    }
    async create(createDto) {
        let team;
        team = await this.teamRepository.getByName(createDto.name);
        if (team) {
            throw new common_1.ConflictException('team with given name already exists');
        }
        team = await this.teamRepository.getByCode(createDto.code);
        if (team) {
            throw new common_1.ConflictException('team with given code already exists');
        }
        try {
            const teamCreated = await this.teamRepository.create({ ...createDto });
            if (!teamCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async handleteamsCreatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.TEAM_CACHE_KEY);
    }
    async find(params = {}) {
        const { s, filters, lead, sortBy, sortDir, page, limit, status } = params;
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
        if (lead) {
            options.lead = lead;
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.teamModel.find(options).populate('lead').sort(sort);
        if (page) {
            const pageValue = parseInt(page) || 1;
            const limitValue = parseInt(limit) || 10;
            const skipCount = (pageValue - 1) * limitValue;
            const items = await query.skip(skipCount).limit(limitValue).exec();
            const count = await this.teamRepository.count(options);
            return { items, count };
        }
        const items = await query.exec();
        return items;
    }
    async update(id, updateDto) {
        const teamData = await this.teamRepository.findOne({ _id: id });
        if (!teamData) {
            throw new common_1.NotFoundException();
        }
        const team = await this.teamRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!team)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handleteamUpdatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.TEAM_CACHE_KEY);
    }
    async delete(id) {
        const team = await this.teamRepository.findOne({ _id: id });
        if (!team)
            throw new common_1.NotFoundException();
        const deleted = await this.teamRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handleteamDeletedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.TEAM_CACHE_KEY);
    }
};
exports.TeamsService = TeamsService;
__decorate([
    (0, event_emitter_1.OnEvent)('team.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsService.prototype, "handleteamsCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('team.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsService.prototype, "handleteamUpdatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('team.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsService.prototype, "handleteamDeletedEvent", null);
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Team')),
    __param(1, (0, common_1.Inject)('Staff')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        teams_repository_1.TeamRepository,
        event_emitter_1.EventEmitter2,
        redis_service_1.RedisService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map