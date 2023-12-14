"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const redis_module_1 = require("../redis/redis.module");
const database_module_1 = require("../database/database.module");
const teams_service_1 = require("./teams.service");
const teams_controller_1 = require("./teams.controller");
const team_entity_1 = require("./entities/team.entity");
const teams_repository_1 = require("./teams.repository");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const staff_entity_1 = require("../staff/entities/staff.entity");
exports.TenantModelProviders = [
    {
        provide: 'Team',
        useFactory: (connection) => connection.model('Team', team_entity_1.TeamSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Staff',
        useFactory: (connection) => connection.model('Staff', staff_entity_1.StaffSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
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
        controllers: [teams_controller_1.TeamsController],
        providers: [teams_service_1.TeamsService, teams_repository_1.TeamRepository, ...exports.TenantModelProviders],
    })
], TeamsModule);
//# sourceMappingURL=teams.module.js.map