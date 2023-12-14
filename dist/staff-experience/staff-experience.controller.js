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
exports.StaffExperienceController = void 0;
const common_1 = require("@nestjs/common");
const params_with_id_1 = require("../common/params-with-id");
const auth_guard_1 = require("../gaurds/auth.guard");
const staff_experience_service_1 = require("./staff-experience.service");
const create_staff_experience_dto_1 = require("./dto/create-staff-experience.dto");
const update_staff_experience_dto_1 = require("./dto/update-staff-experience.dto");
let StaffExperienceController = class StaffExperienceController {
    constructor(staffExperienceService) {
        this.staffExperienceService = staffExperienceService;
    }
    async create(createDto) {
        const branch = await this.staffExperienceService.create(createDto);
        if (branch)
            return { success: true };
    }
    findAll(req) {
        return this.staffExperienceService.find(req.query);
    }
    findOne(id) {
        return this.staffExperienceService.findOne(id);
    }
    update({ id }, updateDto) {
        return this.staffExperienceService.update(id, updateDto);
    }
    delete(id) {
        return this.staffExperienceService.delete(id);
    }
};
exports.StaffExperienceController = StaffExperienceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_experience_dto_1.CreateStaffExperienceDto]),
    __metadata("design:returntype", Promise)
], StaffExperienceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffExperienceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffExperienceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default,
        update_staff_experience_dto_1.UpdateStaffExperienceDto]),
    __metadata("design:returntype", void 0)
], StaffExperienceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffExperienceController.prototype, "delete", null);
exports.StaffExperienceController = StaffExperienceController = __decorate([
    (0, common_1.Controller)('staff-experience'),
    __metadata("design:paramtypes", [staff_experience_service_1.StaffExperienceService])
], StaffExperienceController);
//# sourceMappingURL=staff-experience.controller.js.map