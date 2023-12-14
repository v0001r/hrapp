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
exports.DesignationsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("mongoose");
const designations_repository_1 = require("./designations.repository");
const cache_keys_constant_1 = require("../cache-keys.constant");
let DesignationsService = class DesignationsService {
    constructor(designationModel, designationRepository, eventEmitter) {
        this.designationModel = designationModel;
        this.designationRepository = designationRepository;
        this.eventEmitter = eventEmitter;
    }
    async findOne(params = {}, projection) {
        const CACHE_KEY = `${cache_keys_constant_1.DESIGNATION_CACHE_KEY}_${params._id.toString()}`;
        const designation = await this.designationRepository.findOne(params, projection);
        if (!designation)
            throw new common_1.NotFoundException();
        return designation;
    }
    async create(createDto) {
        console.log('1111', createDto);
        let designation;
        designation = await this.designationRepository.getByName(createDto.name);
        if (designation) {
            throw new common_1.ConflictException('designation with given name already exists');
        }
        try {
            const designationCreated = await this.designationRepository.create(createDto);
            if (!designationCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async find(params = {}) {
        const { s, filters, sortBy, sortDir, page, limit, status } = params;
        const options = {};
        if (s) {
            options.$or = [
                { name: new RegExp(s, 'i') },
                { code: new RegExp(s, 'i') },
            ];
        }
        if (filters && (filters.dateFrom || filters.dateTo)) {
            options.createdAt = {
                $gt: new Date(filters.dateFrom || '1970-01-01'),
                $lt: filters.dateTo ? new Date(filters.dateTo) : new Date(),
            };
        }
        if (status) {
            options.status = status;
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.designationModel.find(options).sort(sort);
        if (page) {
            const pageValue = parseInt(page) || 1;
            const limitValue = parseInt(limit) || 10;
            const skipCount = (pageValue - 1) * limitValue;
            const items = await query.skip(skipCount).limit(limitValue).exec();
            const count = await this.designationRepository.count(options);
            return { items, count };
        }
        const items = await query.exec();
        return items;
    }
    async update(id, updateDto) {
        const designationData = await this.designationRepository.findOne({ _id: id });
        if (!designationData) {
            throw new common_1.NotFoundException();
        }
        const designation = await this.designationRepository.findOneAndUpdate({
            _id: id,
        }, { $set: updateDto });
        if (!designation)
            throw new common_1.HttpException('Error occured while updating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
    async delete(id) {
        const designation = await this.designationRepository.findOne({ _id: id });
        if (!designation)
            throw new common_1.NotFoundException();
        const deleted = await this.designationRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
};
exports.DesignationsService = DesignationsService;
exports.DesignationsService = DesignationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Designation')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        designations_repository_1.DesignationRepository,
        event_emitter_1.EventEmitter2])
], DesignationsService);
//# sourceMappingURL=designations.service.js.map