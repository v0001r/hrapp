"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const files_module_1 = require("../files/files.module");
const redis_module_1 = require("../redis/redis.module");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const staff_service_1 = require("./staff.service");
const staff_controller_1 = require("./staff.controller");
const staff_entity_1 = require("./entities/staff.entity");
const staff_repository_1 = require("./staff.repository");
const team_entity_1 = require("../teams/entities/team.entity");
const branch_entity_1 = require("../branches/entities/branch.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const designation_entity_1 = require("../designations/entities/designation.entity");
exports.TenantModelProviders = [
    {
        provide: 'Staff',
        useFactory: (connection) => connection.model('Staff', staff_entity_1.StaffSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Team',
        useFactory: (connection) => connection.model('Team', team_entity_1.TeamSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Branch',
        useFactory: (connection) => connection.model('Branch', branch_entity_1.BranchSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Role',
        useFactory: (connection) => connection.model('Role', role_entity_1.RoleSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Department',
        useFactory: (connection) => connection.model('Department', department_entity_1.DepartmentSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Designation',
        useFactory: (connection) => connection.model('Designation', designation_entity_1.DesignationSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let StaffModule = class StaffModule {
};
exports.StaffModule = StaffModule;
exports.StaffModule = StaffModule = __decorate([
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
            redis_module_1.RedisModule,
            files_module_1.FilesModule
        ],
        controllers: [staff_controller_1.StaffController],
        providers: [staff_service_1.StaffService, staff_repository_1.StaffRepository, ...exports.TenantModelProviders],
    })
], StaffModule);
//# sourceMappingURL=staff.module.js.map