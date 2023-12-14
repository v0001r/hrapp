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
exports.StaffEducationController = void 0;
const common_1 = require("@nestjs/common");
const params_with_id_1 = require("../common/params-with-id");
const auth_guard_1 = require("../gaurds/auth.guard");
const staff_education_service_1 = require("./staff-education.service");
const create_staff_education_dto_1 = require("./dto/create-staff-education.dto");
const update_staff_education_dto_1 = require("./dto/update-staff-education.dto");
let StaffEducationController = class StaffEducationController {
    constructor(staffEducationService) {
        this.staffEducationService = staffEducationService;
    }
    async create(createDto) {
        const branch = await this.staffEducationService.create(createDto);
        if (branch)
            return { success: true };
    }
    findAll(req) {
        return this.staffEducationService.find(req.query);
    }
    findOne(id) {
        return this.staffEducationService.findOne(id);
    }
    update({ id }, updateDto) {
        return this.staffEducationService.update(id, updateDto);
    }
    delete(id) {
        return this.staffEducationService.delete(id);
    }
};
exports.StaffEducationController = StaffEducationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_education_dto_1.CreateStaffEducationDto]),
    __metadata("design:returntype", Promise)
], StaffEducationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffEducationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffEducationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default,
        update_staff_education_dto_1.UpdateStaffEducationDto]),
    __metadata("design:returntype", void 0)
], StaffEducationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffEducationController.prototype, "delete", null);
exports.StaffEducationController = StaffEducationController = __decorate([
    (0, common_1.Controller)('staff-education'),
    __metadata("design:paramtypes", [staff_education_service_1.StaffEducationService])
], StaffEducationController);
//# sourceMappingURL=staff-education.controller.js.map