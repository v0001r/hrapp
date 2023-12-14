/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { CreateStaffEducationDto } from './dto/create-staff-education.dto';
import { UpdateStaffEducationDto } from './dto/update-staff-education.dto';
import { StaffEducationDocument } from './entities/staff-education.entity';
import { StaffEducationRepository } from './staff-education.repository';
export declare class StaffEducationService {
    private readonly staffEducationModel;
    private readonly staffEducationRepository;
    private readonly eventEmitter;
    constructor(staffEducationModel: Model<StaffEducationDocument>, staffEducationRepository: StaffEducationRepository, eventEmitter: EventEmitter2);
    findOne(id: any): Promise<any>;
    create(createDto: CreateStaffEducationDto): Promise<{
        success: boolean;
    }>;
    find(params?: any): Promise<(import("mongoose").Document<unknown, {}, StaffEducationDocument> & import("./entities/staff-education.entity").StaffEducation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, updateDto: UpdateStaffEducationDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
