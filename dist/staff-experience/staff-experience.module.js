"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffExperienceModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const staff_experience_service_1 = require("./staff-experience.service");
const staff_experience_controller_1 = require("./staff-experience.controller");
const staff_experience_entity_1 = require("./entities/staff-experience.entity");
const staff_experience_repository_1 = require("./staff-experience.repository");
exports.TenantModelProviders = [
    {
        provide: 'StaffExperience',
        useFactory: (connection) => connection.model('StaffExperience', staff_experience_entity_1.StaffExperienceSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let StaffExperienceModule = class StaffExperienceModule {
};
exports.StaffExperienceModule = StaffExperienceModule;
exports.StaffExperienceModule = StaffExperienceModule = __decorate([
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
        controllers: [staff_experience_controller_1.StaffExperienceController],
        providers: [staff_experience_service_1.StaffExperienceService, staff_experience_repository_1.StaffExperienceRepository, ...exports.TenantModelProviders],
    })
], StaffExperienceModule);
//# sourceMappingURL=staff-experience.module.js.map