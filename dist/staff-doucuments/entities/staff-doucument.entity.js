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
exports.StaffDoucumentSchema = exports.StaffDoucument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let StaffDoucument = class StaffDoucument {
};
exports.StaffDoucument = StaffDoucument;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], StaffDoucument.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Staff is required'],
    }),
    __metadata("design:type", String)
], StaffDoucument.prototype, "staff_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Document type is required'],
    }),
    __metadata("design:type", String)
], StaffDoucument.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffDoucument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffDoucument.prototype, "valid_from", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffDoucument.prototype, "valid_to", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { key: String, url: String },
    }),
    __metadata("design:type", Object)
], StaffDoucument.prototype, "document", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StaffDoucument.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StaffDoucument.prototype, "updatedAt", void 0);
exports.StaffDoucument = StaffDoucument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'staff_experience', versionKey: false, timestamps: true })
], StaffDoucument);
exports.StaffDoucumentSchema = mongoose_1.SchemaFactory.createForClass(StaffDoucument);
//# sourceMappingURL=staff-doucument.entity.js.map