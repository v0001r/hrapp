"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftsModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const shifts_service_1 = require("./shifts.service");
const shifts_controller_1 = require("./shifts.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const database_module_1 = require("../database/database.module");
const shift_entity_1 = require("./entities/shift.entity");
const shift_repository_1 = require("./shift.repository");
const shift_assign_entity_1 = require("./entities/shift-assign.entity");
const team_entity_1 = require("../teams/entities/team.entity");
const staff_entity_1 = require("../staff/entities/staff.entity");
const shift_assign_repository_1 = require("./shift-assign.repository");
exports.TenantModelProviders = [
    {
        provide: 'Shift',
        useFactory: (connection) => connection.model('Shift', shift_entity_1.ShiftSchema),
        inject: ['TENANT_CONNECTION'],
    },
    {
        provide: 'Shiftassign',
        useFactory: (connection) => connection.model('Shiftassign', shift_assign_entity_1.ShiftassignSchema),
        inject: ['TENANT_CONNECTION'],
    },
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
let ShiftsModule = class ShiftsModule {
};
exports.ShiftsModule = ShiftsModule;
exports.ShiftsModule = ShiftsModule = __decorate([
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
        controllers: [shifts_controller_1.ShiftsController],
        providers: [shifts_service_1.ShiftsService, shift_repository_1.ShiftRepository, shift_assign_repository_1.ShiftassignRepository, ...exports.TenantModelProviders],
    })
], ShiftsModule);
//# sourceMappingURL=shifts.module.js.map