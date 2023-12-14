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
exports.StaffSchema = exports.Staff = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const branch_entity_1 = require("../../branches/entities/branch.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const designation_entity_1 = require("../../designations/entities/designation.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const team_entity_1 = require("../../teams/entities/team.entity");
let Staff = class Staff {
};
exports.Staff = Staff;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Staff.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Salutation is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "salutation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'First name is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "first_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Staff.prototype, "middle_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Last name is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "last_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Staff with this email already exists. The email must be unique.']
    }),
    __metadata("design:type", String)
], Staff.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "work_email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "personal_email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Gross salary is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "gross_salary", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'CTC is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "ctc", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Phone is required'],
        unique: [true, 'Staff with this phone number already exists. The phone number must be unique.']
    }),
    __metadata("design:type", String)
], Staff.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "personal_phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "alt_phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Branch' }],
        required: [true, 'Branch is required'],
        index: true
    }),
    (0, class_transformer_1.Type)(() => branch_entity_1.Branch),
    __metadata("design:type", branch_entity_1.Branch)
], Staff.prototype, "branch_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Team' }],
        required: [true, 'Team is required'],
        index: true
    }),
    (0, class_transformer_1.Type)(() => team_entity_1.Team),
    __metadata("design:type", team_entity_1.Team)
], Staff.prototype, "team_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: department_entity_1.Department.name }],
        required: [true, 'Department is required'],
        index: true
    }),
    (0, class_transformer_1.Type)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], Staff.prototype, "department_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Staff',
        required: [true, 'Reporting manager is required'],
    }),
    (0, class_transformer_1.Type)(() => Staff),
    __metadata("design:type", Staff)
], Staff.prototype, "primary_reporting", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Staff' }],
        index: true
    }),
    (0, class_transformer_1.Type)(() => Staff),
    __metadata("design:type", Array)
], Staff.prototype, "secondary_reporting", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: role_entity_1.Role.name,
        required: [true, 'Role is required'],
    }),
    (0, class_transformer_1.Type)(() => role_entity_1.Role),
    __metadata("design:type", role_entity_1.Role)
], Staff.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId, ref: designation_entity_1.Designation.name,
        required: [true, 'Designation is required'],
    }),
    (0, class_transformer_1.Type)(() => designation_entity_1.Designation),
    __metadata("design:type", designation_entity_1.Designation)
], Staff.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, }),
    __metadata("design:type", String)
], Staff.prototype, "dob", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "present_address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "place_of_birth", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "nationality", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "blood_group", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "marital_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "aniversary_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "adhaar_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "pan_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "bank_acc_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "bank_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "branch_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "ifsc_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "employement_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "pt_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Staff.prototype, "physically_challenged", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "cost_center", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'City is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'State is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Country is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Employee Id is required'],
    }),
    __metadata("design:type", String)
], Staff.prototype, "emp_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], Staff.prototype, "incentive_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], Staff.prototype, "incentive_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { key: String, url: String },
    }),
    __metadata("design:type", Object)
], Staff.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "mac_address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Staff.prototype, "workshift", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true
    }),
    __metadata("design:type", Boolean)
], Staff.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "emergancy_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "emergancy_relation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "emergancy_phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Staff.prototype, "emergancy_address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Staff.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Staff.prototype, "updatedAt", void 0);
exports.Staff = Staff = __decorate([
    (0, mongoose_1.Schema)({ collection: 'hr_staff', versionKey: false, timestamps: true })
], Staff);
exports.StaffSchema = mongoose_1.SchemaFactory.createForClass(Staff);
//# sourceMappingURL=staff.entity.js.map