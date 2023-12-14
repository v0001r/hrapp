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
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftsController {
    private readonly shiftsService;
    constructor(shiftsService: ShiftsService);
    create(createDto: CreateShiftDto): Promise<{
        success: boolean;
    }>;
    findAll(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("./entities/shift.entity").ShiftDocument> & import("./entities/shift.entity").Shift & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        items: (import("mongoose").Document<unknown, {}, import("./entities/shift.entity").ShiftDocument> & import("./entities/shift.entity").Shift & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    findOne({ id }: ParamsWithId): Promise<import("./entities/shift.entity").ShiftDocument>;
    update({ id }: ParamsWithId, updateDto: UpdateShiftDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    deleteMany(ids: [string]): Promise<{
        success: boolean;
    }>;
    assign_shift(body: any): Promise<void>;
    conflicted(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("./entities/shift-assign.entity").ShiftassignDocument> & import("./entities/shift-assign.entity").Shiftassign & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
