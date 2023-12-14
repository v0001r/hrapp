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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyLeaveSchema = exports.ApplyLeave = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const staff_entity_1 = require("../../staff/entities/staff.entity");
let ApplyLeave = class ApplyLeave {
};
exports.ApplyLeave = ApplyLeave;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], ApplyLeave.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Staff',
    }),
    (0, class_transformer_1.Type)(() => staff_entity_1.Staff),
    __metadata("design:type", staff_entity_1.Staff)
], ApplyLeave.prototype, "employee", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ApplyLeave.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ApplyLeave.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Leave Reason is required'],
    }),
    __metadata("design:type", String)
], ApplyLeave.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ApplyLeave.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ApplyLeave.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ApplyLeave.prototype, "updatedAt", void 0);
exports.ApplyLeave = ApplyLeave = __decorate([
    (0, mongoose_1.Schema)({ collection: 'leaves', versionKey: false, timestamps: true })
], ApplyLeave);
exports.ApplyLeaveSchema = mongoose_1.SchemaFactory.createForClass(ApplyLeave);
//# sourceMappingURL=apply-leave.entity.js.map