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
exports.ShiftassignSchema = exports.Shiftassign = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const shift_entity_1 = require("./shift.entity");
const team_entity_1 = require("../../teams/entities/team.entity");
let Shiftassign = class Shiftassign {
};
exports.Shiftassign = Shiftassign;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Shiftassign.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Shiftassign.prototype, "emp_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Team',
    }),
    (0, class_transformer_1.Type)(() => team_entity_1.Team),
    __metadata("design:type", team_entity_1.Team)
], Shiftassign.prototype, "team_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId, ref: shift_entity_1.Shift.name,
        required: [true, 'Shift is required'],
    }),
    (0, class_transformer_1.Type)(() => shift_entity_1.Shift),
    __metadata("design:type", shift_entity_1.Shift)
], Shiftassign.prototype, "shift_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Shiftassign.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Shiftassign.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Shiftassign.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Shiftassign.prototype, "updatedAt", void 0);
exports.Shiftassign = Shiftassign = __decorate([
    (0, mongoose_1.Schema)({ collection: 'shift_assign', versionKey: false, timestamps: true })
], Shiftassign);
exports.ShiftassignSchema = mongoose_1.SchemaFactory.createForClass(Shiftassign);
//# sourceMappingURL=shift-assign.entity.js.map