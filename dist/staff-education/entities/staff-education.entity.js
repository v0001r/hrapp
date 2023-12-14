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
exports.StaffEducationSchema = exports.StaffEducation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let StaffEducation = class StaffEducation {
};
exports.StaffEducation = StaffEducation;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], StaffEducation.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Staff is required'],
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "staff_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'College/university name is required'],
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "college_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "degree", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "specialization", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "course_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "passing_year", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffEducation.prototype, "marks", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], StaffEducation.prototype, "recent", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StaffEducation.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StaffEducation.prototype, "updatedAt", void 0);
exports.StaffEducation = StaffEducation = __decorate([
    (0, mongoose_1.Schema)({ collection: 'staff_education', versionKey: false, timestamps: true })
], StaffEducation);
exports.StaffEducationSchema = mongoose_1.SchemaFactory.createForClass(StaffEducation);
//# sourceMappingURL=staff-education.entity.js.map