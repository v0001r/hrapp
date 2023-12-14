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
exports.DesignationsController = void 0;
const common_1 = require("@nestjs/common");
const params_with_id_1 = require("../common/params-with-id");
const auth_guard_1 = require("../gaurds/auth.guard");
const designations_service_1 = require("./designations.service");
const create_designation_dto_1 = require("./dto/create-designation.dto");
const update_designation_dto_1 = require("./dto/update-designation.dto");
let DesignationsController = class DesignationsController {
    constructor(designationsService) {
        this.designationsService = designationsService;
    }
    async create(createDto) {
        const designation = await this.designationsService.create(createDto);
        if (designation)
            return { success: true };
    }
    findAll(req) {
        return this.designationsService.find(req.query);
    }
    findOne({ id }) {
        const query = { _id: id };
        return this.designationsService.findOne(query);
    }
    update({ id }, updateDto) {
        return this.designationsService.update(id, updateDto);
    }
    delete(id) {
        return this.designationsService.delete(id);
    }
};
exports.DesignationsController = DesignationsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_designation_dto_1.CreateDesignationDto]),
    __metadata("design:returntype", Promise)
], DesignationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DesignationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default]),
    __metadata("design:returntype", void 0)
], DesignationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default,
        update_designation_dto_1.UpdateDesignationDto]),
    __metadata("design:returntype", void 0)
], DesignationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DesignationsController.prototype, "delete", null);
exports.DesignationsController = DesignationsController = __decorate([
    (0, common_1.Controller)('designations'),
    __metadata("design:paramtypes", [designations_service_1.DesignationsService])
], DesignationsController);
//# sourceMappingURL=designations.controller.js.map