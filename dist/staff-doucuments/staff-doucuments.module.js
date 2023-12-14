"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffDoucumentsModule = exports.TenantModelProviders = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const staff_doucuments_service_1 = require("./staff-doucuments.service");
const staff_doucuments_controller_1 = require("./staff-doucuments.controller");
const staff_documents_repository_1 = require("./staff-documents.repository");
const staff_doucument_entity_1 = require("./entities/staff-doucument.entity");
const files_module_1 = require("../files/files.module");
exports.TenantModelProviders = [
    {
        provide: 'StaffDoucument',
        useFactory: (connection) => connection.model('StaffDoucument', staff_doucument_entity_1.StaffDoucumentSchema),
        inject: ['TENANT_CONNECTION'],
    },
];
let StaffDoucumentsModule = class StaffDoucumentsModule {
};
exports.StaffDoucumentsModule = StaffDoucumentsModule;
exports.StaffDoucumentsModule = StaffDoucumentsModule = __decorate([
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
            files_module_1.FilesModule
        ],
        controllers: [staff_doucuments_controller_1.StaffDoucumentsController],
        providers: [staff_doucuments_service_1.StaffDoucumentsService, staff_documents_repository_1.StaffDoucumentRepository, ...exports.TenantModelProviders],
    })
], StaffDoucumentsModule);
//# sourceMappingURL=staff-doucuments.module.js.map