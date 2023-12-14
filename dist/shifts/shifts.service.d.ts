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
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftDocument } from './entities/shift.entity';
import { ShiftRepository } from './shift.repository';
import { ShiftassignDocument } from './entities/shift-assign.entity';
import { ShiftassignRepository } from './shift-assign.repository';
export declare class ShiftsService {
    private readonly shiftModel;
    private readonly staffModel;
    private readonly shiftassignModel;
    private readonly shiftRepository;
    private readonly shiftassignRepository;
    private readonly eventEmitter;
    constructor(shiftModel: Model<ShiftDocument>, staffModel: Model<ShiftDocument>, shiftassignModel: Model<ShiftassignDocument>, shiftRepository: ShiftRepository, shiftassignRepository: ShiftassignRepository, eventEmitter: EventEmitter2);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<ShiftDocument>;
    create(createDto: CreateShiftDto): Promise<{
        success: boolean;
    }>;
    find(params?: any): Promise<(import("mongoose").Document<unknown, {}, ShiftDocument> & import("./entities/shift.entity").Shift & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        items: (import("mongoose").Document<unknown, {}, ShiftDocument> & import("./entities/shift.entity").Shift & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateShiftDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    deleteMany(ids: string[]): Promise<{
        success: boolean;
    }>;
    assign_shift(createDto: any): Promise<void>;
    get_shifts(params?: any): Promise<(import("mongoose").Document<unknown, {}, ShiftassignDocument> & import("./entities/shift-assign.entity").Shiftassign & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
