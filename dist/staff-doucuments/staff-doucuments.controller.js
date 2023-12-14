"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffDoucumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("../gaurds/auth.guard");
const staff_doucuments_service_1 = require("./staff-doucuments.service");
const create_staff_doucument_dto_1 = require("./dto/create-staff-doucument.dto");
let StaffDoucumentsController = class StaffDoucumentsController {
    constructor(staffDoucumentsService, request) {
        this.staffDoucumentsService = staffDoucumentsService;
        this.request = request;
    }
    async create(createDto, document) {
        const staff = await this.staffDoucumentsService.create(createDto, document);
        return { success: true };
    }
    findOne(id) {
        return this.staffDoucumentsService.findOne(id);
    }
    delete(id) {
        return this.staffDoucumentsService.delete(id);
    }
};
exports.StaffDoucumentsController = StaffDoucumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_doucument_dto_1.CreateStaffDoucumentDto, Object]),
    __metadata("design:returntype", Promise)
], StaffDoucumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffDoucumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffDoucumentsController.prototype, "delete", null);
exports.StaffDoucumentsController = StaffDoucumentsController = __decorate([
    (0, common_1.Controller)('staff-doucuments'),
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [staff_doucuments_service_1.StaffDoucumentsService, Object])
], StaffDoucumentsController);
//# sourceMappingURL=staff-doucuments.controller.js.map