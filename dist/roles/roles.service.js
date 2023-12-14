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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const redis_service_1 = require("../redis/redis.service");
const roles_repository_1 = require("./roles.repository");
let RolesService = class RolesService {
    constructor(roleModel, roleRepository, eventEmitter, redisService) {
        this.roleModel = roleModel;
        this.roleRepository = roleRepository;
        this.eventEmitter = eventEmitter;
        this.redisService = redisService;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.ROLE_CACHE_KEY}_${params._id.toString()}`;
        const role = await this.roleRepository.findOne(params, projection);
        if (!role)
            throw new common_1.NotFoundException();
        return role;
    }
    async create(createDto) {
        let role;
        role = await this.roleRepository.getByName(createDto.name);
        if (role) {
            throw new common_1.ConflictException('role with given name already exists');
        }
        try {
            const roleCreated = await this.roleRepository.create({ ...createDto });
            if (!roleCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async handlerolesCreatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.ROLE_CACHE_KEY);
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
        const query = this.roleModel.find(options).sort(sort);
        if (params.page) {
            const page = parseInt(params.page) || 1;
            const limit = parseInt(params.limit) || 10;
            const items = await query.skip((page - 1) * limit).limit(limit).exec();
            const count = await this.roleRepository.count(options);
            return {
                items,
                count
            };
        }
        return await query.exec();
    }
    async update(id, updateDto) {
        const roleData = await this.roleRepository.findOne({ _id: id });
        if (!roleData) {
            throw new common_1.NotFoundException();
        }
        const role = await this.roleRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!role)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handleroleUpdatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.ROLE_CACHE_KEY);
    }
    async delete(id) {
        const role = await this.roleRepository.findOne({ _id: id });
        if (!role)
            throw new common_1.NotFoundException();
        const deleted = await this.roleRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async handleroleDeletedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.ROLE_CACHE_KEY);
    }
};
exports.RolesService = RolesService;
__decorate([
    (0, event_emitter_1.OnEvent)('role.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "handlerolesCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('role.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "handleroleUpdatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('role.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "handleroleDeletedEvent", null);
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Role')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        roles_repository_1.RoleRepository,
        event_emitter_1.EventEmitter2,
        redis_service_1.RedisService])
], RolesService);
//# sourceMappingURL=roles.service.js.map