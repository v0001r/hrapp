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
exports.StaffDoucumentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const entity_repository_base_1 = require("../common/database/entity.repository.base");
let StaffDoucumentRepository = class StaffDoucumentRepository extends entity_repository_base_1.EntityRepository {
    constructor(staffDoucumentModel) {
        super(staffDoucumentModel);
        this.staffDoucumentModel = staffDoucumentModel;
    }
    async getById(id) {
        let staffDoucument;
        try {
            staffDoucument = await this.staffDoucumentModel.find({ staff_id: id }).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return staffDoucument;
    }
};
exports.StaffDoucumentRepository = StaffDoucumentRepository;
exports.StaffDoucumentRepository = StaffDoucumentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('StaffDoucument')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], StaffDoucumentRepository);
//# sourceMappingURL=staff-documents.repository.js.map