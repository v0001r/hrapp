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
exports.StaffExperienceService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("mongoose");
const staff_experience_repository_1 = require("./staff-experience.repository");
let StaffExperienceService = class StaffExperienceService {
    constructor(staffExperienceModel, staffExperienceRepository, eventEmitter) {
        this.staffExperienceModel = staffExperienceModel;
        this.staffExperienceRepository = staffExperienceRepository;
        this.eventEmitter = eventEmitter;
    }
    async findOne(id) {
        ;
        const exp = await this.staffExperienceRepository.getById(id);
        if (!exp)
            throw new common_1.NotFoundException();
        return exp;
    }
    async create(createDto) {
        try {
            const expCreated = await this.staffExperienceRepository.create({ ...createDto });
            if (!expCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async find(params = {}) {
        let options = {};
        let sort = {
            createdAt: "desc"
        };
        if (params.sortBy) {
            sort[params.sortBy] = params.sortDir || 'asc';
        }
        const query = this.staffExperienceModel.find(options).sort(sort);
        return await query.exec();
    }
    async update(id, updateDto) {
        const expData = await this.staffExperienceRepository.findOne({ _id: id });
        if (!expData) {
            throw new common_1.NotFoundException();
        }
        const exp = await this.staffExperienceRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!exp)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async delete(id) {
        const exp = await this.staffExperienceRepository.findOne({ _id: id });
        if (!exp)
            throw new common_1.NotFoundException();
        const deleted = await this.staffExperienceRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
};
exports.StaffExperienceService = StaffExperienceService;
exports.StaffExperienceService = StaffExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('StaffExperience')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        staff_experience_repository_1.StaffExperienceRepository,
        event_emitter_1.EventEmitter2])
], StaffExperienceService);
//# sourceMappingURL=staff-experience.service.js.map