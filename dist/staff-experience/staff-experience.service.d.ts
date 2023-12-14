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
import { CreateStaffExperienceDto } from './dto/create-staff-experience.dto';
import { UpdateStaffExperienceDto } from './dto/update-staff-experience.dto';
import { StaffExperienceRepository } from './staff-experience.repository';
import { StaffExperienceDocument } from './entities/staff-experience.entity';
export declare class StaffExperienceService {
    private readonly staffExperienceModel;
    private readonly staffExperienceRepository;
    private readonly eventEmitter;
    constructor(staffExperienceModel: Model<StaffExperienceDocument>, staffExperienceRepository: StaffExperienceRepository, eventEmitter: EventEmitter2);
    findOne(id: any): Promise<any>;
    create(createDto: CreateStaffExperienceDto): Promise<{
        success: boolean;
    }>;
    find(params?: any): Promise<(import("mongoose").Document<unknown, {}, StaffExperienceDocument> & import("./entities/staff-experience.entity").StaffExperience & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, updateDto: UpdateStaffExperienceDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
