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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Request } from 'express';
import ParamsWithId from '../common/params-with-id';
import { StaffExperienceService } from './staff-experience.service';
import { CreateStaffExperienceDto } from './dto/create-staff-experience.dto';
import { UpdateStaffExperienceDto } from './dto/update-staff-experience.dto';
export declare class StaffExperienceController {
    private readonly staffExperienceService;
    constructor(staffExperienceService: StaffExperienceService);
    create(createDto: CreateStaffExperienceDto): Promise<{
        success: boolean;
    }>;
    findAll(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("./entities/staff-experience.entity").StaffExperienceDocument> & import("./entities/staff-experience.entity").StaffExperience & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<any>;
    update({ id }: ParamsWithId, updateDto: UpdateStaffExperienceDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
