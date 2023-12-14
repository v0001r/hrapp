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
exports.ApplyLeaveController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../gaurds/auth.guard");
const params_with_id_1 = require("../common/params-with-id");
const apply_leave_service_1 = require("./apply-leave.service");
const create_apply_leave_dto_1 = require("./dto/create-apply-leave.dto");
const update_apply_leave_dto_1 = require("./dto/update-apply-leave.dto");
let ApplyLeaveController = class ApplyLeaveController {
    constructor(applyLeaveService) {
        this.applyLeaveService = applyLeaveService;
    }
    async create(createDto) {
        return this.applyLeaveService.create(createDto);
    }
    findAll(req) {
        return this.applyLeaveService.find(req.query);
    }
    findOne({ id }) {
        const query = { _id: id };
        return this.applyLeaveService.findOne(query);
    }
    update({ id }, updateDto) {
        return this.applyLeaveService.update(id, updateDto);
    }
    delete(id) {
        return this.applyLeaveService.delete(id);
    }
};
exports.ApplyLeaveController = ApplyLeaveController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apply_leave_dto_1.CreateApplyLeaveDto]),
    __metadata("design:returntype", Promise)
], ApplyLeaveController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplyLeaveController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default]),
    __metadata("design:returntype", void 0)
], ApplyLeaveController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_with_id_1.default,
        update_apply_leave_dto_1.UpdateApplyLeaveDto]),
    __metadata("design:returntype", void 0)
], ApplyLeaveController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplyLeaveController.prototype, "delete", null);
exports.ApplyLeaveController = ApplyLeaveController = __decorate([
    (0, common_1.Controller)('apply-leave'),
    __metadata("design:paramtypes", [apply_leave_service_1.ApplyLeaveService])
], ApplyLeaveController);
//# sourceMappingURL=apply-leave.controller.js.map