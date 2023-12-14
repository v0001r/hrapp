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
exports.TeamSchema = exports.Team = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const staff_entity_1 = require("../../staff/entities/staff.entity");
let Team = class Team {
};
exports.Team = Team;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Team.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Team name is required'],
        unique: [true, 'Team name already exists. The Team name must be unique.']
    }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Staff',
        required: [true, 'Team Lead is required'],
    }),
    (0, class_transformer_1.Type)(() => staff_entity_1.Staff),
    __metadata("design:type", staff_entity_1.Staff)
], Team.prototype, "lead", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Team code is required'],
        unique: [true, 'Team with this code already exists. The Team code must be unique.']
    }),
    __metadata("design:type", String)
], Team.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true
    }),
    __metadata("design:type", Boolean)
], Team.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Team.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Team.prototype, "updatedAt", void 0);
exports.Team = Team = __decorate([
    (0, mongoose_1.Schema)({ collection: 'hr_teams', versionKey: false, timestamps: true })
], Team);
exports.TeamSchema = mongoose_1.SchemaFactory.createForClass(Team);
//# sourceMappingURL=team.entity.js.map