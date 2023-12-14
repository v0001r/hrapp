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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_keys_constant_1 = require("../cache-keys.constant");
const mongoose_1 = require("mongoose");
const permissions_repository_1 = require("./permissions.repository");
const redis_service_1 = require("../redis/redis.service");
let PermissionsService = class PermissionsService {
    constructor(permissionModel, permissionRepository, eventEmitter, redisService) {
        this.permissionModel = permissionModel;
        this.permissionRepository = permissionRepository;
        this.eventEmitter = eventEmitter;
        this.redisService = redisService;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.PERMISSIONS_CACHE_KEY}_${params._id.toString()}`;
        const permission = await this.permissionRepository.findOne(params, projection);
        if (!permission)
            throw new common_1.NotFoundException();
        return permission;
    }
    async create(createDto) {
        let permission;
        permission = await this.permissionRepository.getByName(createDto.name);
        if (permission) {
            throw new common_1.ConflictException('permission with given name already exists');
        }
        try {
            const permisionCreated = await this.permissionRepository.create({ ...createDto });
            if (!permisionCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async handlepermisionsCreatedEvent({ payload }) {
        await this.redisService.clear(cache_keys_constant_1.PERMISSIONS_CACHE_KEY);
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
        const query = this.permissionModel.find(options).sort(sort);
        if (params.page) {
            const page = parseInt(params.page) || 1;
            const limit = parseInt(params.limit) || 10;
            const items = await query.skip((page - 1) * limit).limit(limit).exec();
            const count = await this.permissionRepository.count(options);
            return {
                items,
                count
            };
        }
        return await query.exec();
    }
};
exports.PermissionsService = PermissionsService;
__decorate([
    (0, event_emitter_1.OnEvent)('permision.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsService.prototype, "handlepermisionsCreatedEvent", null);
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Permission')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        permissions_repository_1.PermissionRepository,
        event_emitter_1.EventEmitter2,
        redis_service_1.RedisService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map