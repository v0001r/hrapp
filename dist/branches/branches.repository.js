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
exports.BranchRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const entity_repository_base_1 = require("../common/database/entity.repository.base");
let BranchRepository = class BranchRepository extends entity_repository_base_1.EntityRepository {
    constructor(branchModel) {
        super(branchModel);
        this.branchModel = branchModel;
    }
    async getById(_id) {
        let branch;
        try {
            branch = await this.branchModel.findOne({ _id, status: true }, '_id name code status').exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return branch;
    }
    async getByName(name) {
        let branch;
        try {
            branch = await this.branchModel.findOne({ name, status: true }, '_id name code status').exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return branch;
    }
};
exports.BranchRepository = BranchRepository;
exports.BranchRepository = BranchRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Branch')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BranchRepository);
//# sourceMappingURL=branches.repository.js.map