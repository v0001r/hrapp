"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const redis_module_1 = require("../redis/redis.module");
const database_module_1 = require("../database/database.module");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const role_entity_1 = require("./entities/role.entity");
const roles_repository_1 = require("./roles.repository");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
exports.TenantModelProviders = [
    {
        provide: 'Role',
        useFactory: (connection) => connection.model('Role', role_entity_1.RoleSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                    },
                }),
            }),
            database_module_1.DatabaseModule,
            redis_module_1.RedisModule
        ],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService, roles_repository_1.RoleRepository, ...exports.TenantModelProviders],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map