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
exports.StaffExperienceSchema = exports.StaffExperience = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let StaffExperience = class StaffExperience {
};
exports.StaffExperience = StaffExperience;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], StaffExperience.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Staff is required'],
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "staff_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Company Name is required'],
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "company_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "joining_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "releving_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "probation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "timezone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], StaffExperience.prototype, "current_experience", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], StaffExperience.prototype, "current_employer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StaffExperience.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StaffExperience.prototype, "updatedAt", void 0);
exports.StaffExperience = StaffExperience = __decorate([
    (0, mongoose_1.Schema)({ collection: 'staff_experience', versionKey: false, timestamps: true })
], StaffExperience);
exports.StaffExperienceSchema = mongoose_1.SchemaFactory.createForClass(StaffExperience);
//# sourceMappingURL=staff-experience.entity.js.map