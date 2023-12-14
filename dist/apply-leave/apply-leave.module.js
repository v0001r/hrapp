"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyLeaveModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const apply_leave_service_1 = require("./apply-leave.service");
const apply_leave_controller_1 = require("./apply-leave.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const database_module_1 = require("../database/database.module");
const apply_leave_entity_1 = require("./entities/apply-leave.entity");
const apply_leave_repository_1 = require("./apply-leave.repository");
const staff_entity_1 = require("../staff/entities/staff.entity");
exports.TenantModelProviders = [
    {
        provide: 'ApplyLeave',
        useFactory: (connection) => connection.model('ApplyLeave', apply_leave_entity_1.ApplyLeaveSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Staff',
        useFactory: (connection) => connection.model('Staff', staff_entity_1.StaffSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let ApplyLeaveModule = class ApplyLeaveModule {
};
exports.ApplyLeaveModule = ApplyLeaveModule;
exports.ApplyLeaveModule = ApplyLeaveModule = __decorate([
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
        ],
        controllers: [apply_leave_controller_1.ApplyLeaveController],
        providers: [apply_leave_service_1.ApplyLeaveService, apply_leave_repository_1.ApplyLeaveRepository, ...exports.TenantModelProviders],
    })
], ApplyLeaveModule);
//# sourceMappingURL=apply-leave.module.js.map