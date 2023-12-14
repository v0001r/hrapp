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
exports.DesignationSchema = exports.Designation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let Designation = class Designation {
};
exports.Designation = Designation;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Designation.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Designation name is required'],
    }),
    __metadata("design:type", String)
], Designation.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true
    }),
    __metadata("design:type", Boolean)
], Designation.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Designation.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Designation.prototype, "updatedAt", void 0);
exports.Designation = Designation = __decorate([
    (0, mongoose_1.Schema)({ collection: 'designations', versionKey: false, timestamps: true })
], Designation);
exports.DesignationSchema = mongoose_1.SchemaFactory.createForClass(Designation);
//# sourceMappingURL=designation.entity.js.map