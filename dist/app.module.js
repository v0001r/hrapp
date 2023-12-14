"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const Joi = require("joi");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const files_module_1 = require("./files/files.module");
const redis_module_1 = require("./redis/redis.module");
const branches_module_1 = require("./branches/branches.module");
const teams_module_1 = require("./teams/teams.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const staff_module_1 = require("./staff/staff.module");
const apply_leave_module_1 = require("./apply-leave/apply-leave.module");
const shifts_module_1 = require("./shifts/shifts.module");
const departments_module_1 = require("./departments/departments.module");
const designations_module_1 = require("./designations/designations.module");
const staff_experience_module_1 = require("./staff-experience/staff-experience.module");
const staff_education_module_1 = require("./staff-education/staff-education.module");
const staff_doucuments_module_1 = require("./staff-doucuments/staff-doucuments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    PORT: Joi.number(),
                    MONGO_URI: Joi.string().required(),
                    AWS_REGION: Joi.string().required(),
                    AWS_ACCESS_KEY_ID: Joi.string().required(),
                    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
                    AWS_S3_BUCKET: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRATION_TIME: Joi.string().required(),
                    JWT_REFRESH_SECRET: Joi.string().required(),
                    JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
                })
            }),
            files_module_1.FilesModule,
            redis_module_1.RedisModule,
            event_emitter_1.EventEmitterModule.forRoot({
                maxListeners: 100
            }),
            branches_module_1.BranchesModule,
            teams_module_1.TeamsModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            staff_module_1.StaffModule,
            apply_leave_module_1.ApplyLeaveModule,
            shifts_module_1.ShiftsModule,
            departments_module_1.DepartmentsModule,
            designations_module_1.DesignationsModule,
            staff_experience_module_1.StaffExperienceModule,
            staff_education_module_1.StaffEducationModule,
            staff_doucuments_module_1.StaffDoucumentsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map