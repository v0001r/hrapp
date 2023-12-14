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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const core_1 = require("@nestjs/core");
const axios_1 = require("axios");
const params_with_id_1 = require("../common/params-with-id");
const staff_service_1 = require("./staff.service");
const create_staff_dto_1 = require("./dto/create-staff.dto");
const update_staff_dto_1 = require("./dto/update-staff.dto");
const auth_guard_1 = require("../gaurds/auth.guard");
let StaffController = class StaffController {
    constructor(staffService, request) {
        this.staffService = staffService;
        this.request = request;
    }
    async create(createDto, image) {
        var _a;
        const staff = await this.staffService.create(createDto, image);
        if (staff) {
            var password = " ";
            var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 8; i++)
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            const options = {
                method: 'POST',
                url: 'http://127.0.0.1:5011/v1/auth/register',
                headers: {
                    'content-type': 'application/json',
                    'x-tenant': (_a = this.request.headers[`x-tenant`]) === null || _a === void 0 ? void 0 : _a.toString()
                },
                data: {
                    ref_id: staff.staff._id.toString(),
                    name: createDto.first_name,
                    email: createDto.email,
                    mobile: createDto.phone,
                    password: password,
                    user_type: 'S',
                    ip: createDto.ip,
                    mac_id: createDto.mac_address
                }
            };
            await axios_1.default.request(options).then(function (response) {
            }).catch(function (error) {
                console.error(error);
            });
        }
        return { success: true };
    }
    findAll(req) {
        return this.staffService.find(req.query);
    }
    findOne({ id }) {
        const query = { _id: id };
        return this.staffService.findOne(query);
    }
    update({ id }, updateDto, image) {
        return this.staffService.update(id, updateDto, image);
    }
    delete(id) {
        return this.staffService.delete(id);
    }
    deleteMany(ids) {
        return this.staffService.deleteMany(ids);
    }
    async conflicted(req) {
        return await this.staffService.conflicted(req.query);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: false,
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default,
        update_staff_dto_1.UpdateStaffDto, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "deleteMany", null);
__decorate([
    (0, common_1.Get)('conflicted-employess'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "conflicted", null);
exports.StaffController = StaffController = __decorate([
    (0, common_1.Controller)('staff'),
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [staff_service_1.StaffService, Object])
], StaffController);
//# sourceMappingURL=staff.controller.js.map