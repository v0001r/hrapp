"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const redis_module_1 = require("../redis/redis.module");
const database_module_1 = require("../database/database.module");
const branches_service_1 = require("./branches.service");
const branches_controller_1 = require("./branches.controller");
const branch_entity_1 = require("./entities/branch.entity");
const branches_repository_1 = require("./branches.repository");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const staff_entity_1 = require("../staff/entities/staff.entity");
exports.TenantModelProviders = [
    {
        provide: 'Branch',
        useFactory: (connection) => connection.model('Branch', branch_entity_1.BranchSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Staff',
        useFactory: (connection) => connection.model('Staff', staff_entity_1.StaffSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let BranchesModule = class BranchesModule {
};
exports.BranchesModule = BranchesModule;
exports.BranchesModule = BranchesModule = __decorate([
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
        controllers: [branches_controller_1.BranchesController],
        providers: [branches_service_1.BranchesService, branches_repository_1.BranchRepository, ...exports.TenantModelProviders],
    })
], BranchesModule);
//# sourceMappingURL=branches.module.js.map