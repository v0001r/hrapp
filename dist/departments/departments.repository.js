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
exports.DepartmentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const entity_repository_base_1 = require("../common/database/entity.repository.base");
let DepartmentRepository = class DepartmentRepository extends entity_repository_base_1.EntityRepository {
    constructor(departmentModel) {
        super(departmentModel);
        this.departmentModel = departmentModel;
    }
    async getById(_id) {
        let department;
        try {
            department = await this.departmentModel.findOne({ _id }, '_id name code').exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return department;
    }
    async getByName(name) {
        let department;
        try {
            department = await this.departmentModel.findOne({ name }, '_id name code').exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return department;
    }
};
exports.DepartmentRepository = DepartmentRepository;
exports.DepartmentRepository = DepartmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Department')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DepartmentRepository);
//# sourceMappingURL=departments.repository.js.map