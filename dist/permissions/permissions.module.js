"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const redis_module_1 = require("../redis/redis.module");
const database_module_1 = require("../database/database.module");
const permissions_service_1 = require("./permissions.service");
const permissions_controller_1 = require("./permissions.controller");
const permission_entity_1 = require("./entities/permission.entity");
const permissions_repository_1 = require("./permissions.repository");
exports.TenantModelProviders = [
    {
        provide: 'Permission',
        useFactory: (connection) => connection.model('Permission', permission_entity_1.PermissionSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let PermissionsModule = class PermissionsModule {
};
exports.PermissionsModule = PermissionsModule;
exports.PermissionsModule = PermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            redis_module_1.RedisModule
        ],
        controllers: [permissions_controller_1.PermissionsController],
        providers: [permissions_service_1.PermissionsService, permissions_repository_1.PermissionRepository, ...exports.TenantModelProviders],
    })
], PermissionsModule);
//# sourceMappingURL=permissions.module.js.map