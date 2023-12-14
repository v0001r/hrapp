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
exports.StaffDoucumentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const staff_documents_repository_1 = require("./staff-documents.repository");
const s3_files_service_1 = require("../files/s3-files.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let StaffDoucumentsService = class StaffDoucumentsService {
    constructor(staffModel, staffDoucumentRepository, s3FilesService, eventEmitter) {
        this.staffModel = staffModel;
        this.staffDoucumentRepository = staffDoucumentRepository;
        this.s3FilesService = s3FilesService;
        this.eventEmitter = eventEmitter;
    }
    async findOne(id) {
        ;
        const exp = await this.staffDoucumentRepository.getById(id);
        if (!exp)
            throw new common_1.NotFoundException();
        return exp;
    }
    async create(createDto, file) {
        if (file)
            var document = await this.s3FilesService.upload(file.buffer, file.originalname, file.mimetype);
        try {
            if (document) {
                var docCreated = await this.staffDoucumentRepository.create({
                    ...createDto,
                    document,
                });
            }
            else {
                var docCreated = await this.staffDoucumentRepository.create({
                    ...createDto,
                });
            }
            if (!docCreated)
                throw new common_1.HttpException('Error occured while creating.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async delete(id) {
        const exp = await this.staffDoucumentRepository.findOne({ _id: id });
        if (!exp)
            throw new common_1.NotFoundException();
        const deleted = await this.staffDoucumentRepository.delete({
            _id: id,
        });
        if (!deleted)
            throw new common_1.HttpException('Error occured while deleting.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { success: true };
    }
};
exports.StaffDoucumentsService = StaffDoucumentsService;
exports.StaffDoucumentsService = StaffDoucumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('StaffDoucument')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        staff_documents_repository_1.StaffDoucumentRepository,
        s3_files_service_1.S3FilesService,
        event_emitter_1.EventEmitter2])
], StaffDoucumentsService);
//# sourceMappingURL=staff-doucuments.service.js.map