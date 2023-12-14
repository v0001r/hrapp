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
exports.BranchSchema = exports.Branch = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const staff_entity_1 = require("../../staff/entities/staff.entity");
let Branch = class Branch {
};
exports.Branch = Branch;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Branch.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Branch name is required'],
        unique: [true, 'Branch name already exists. The branch name must be unique.']
    }),
    __metadata("design:type", String)
], Branch.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Branch code is required'],
        unique: [true, 'Branch with this code already exists. The branch code must be unique.']
    }),
    __metadata("design:type", String)
], Branch.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Branch.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Branch.prototype, "landmark", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'City is required'],
    }),
    __metadata("design:type", String)
], Branch.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'State is required'],
    }),
    __metadata("design:type", String)
], Branch.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Pincode is required'],
    }),
    __metadata("design:type", String)
], Branch.prototype, "pincode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Country is required'],
    }),
    __metadata("design:type", String)
], Branch.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true
    }),
    __metadata("design:type", Boolean)
], Branch.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Staff',
    }),
    (0, class_transformer_1.Type)(() => staff_entity_1.Staff),
    __metadata("design:type", staff_entity_1.Staff)
], Branch.prototype, "branch_head", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Branch.prototype, "head_office", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Branch.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Branch.prototype, "updatedAt", void 0);
exports.Branch = Branch = __decorate([
    (0, mongoose_1.Schema)({ collection: 'hr_branches', versionKey: false, timestamps: true })
], Branch);
exports.BranchSchema = mongoose_1.SchemaFactory.createForClass(Branch);
//# sourceMappingURL=branch.entity.js.map