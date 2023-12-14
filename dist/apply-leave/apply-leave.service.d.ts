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
import { CreateApplyLeaveDto } from './dto/create-apply-leave.dto';
import { UpdateApplyLeaveDto } from './dto/update-apply-leave.dto';
import { ApplyLeaveRepository } from './apply-leave.repository';
import { ApplyLeaveDocument } from './entities/apply-leave.entity';
import { StaffDocument } from 'src/staff/entities/staff.entity';
export declare class ApplyLeaveService {
    private readonly applyLeaveModel;
    private readonly staffModel;
    private readonly applyLeaveRepository;
    private readonly eventEmitter;
    constructor(applyLeaveModel: Model<ApplyLeaveDocument>, staffModel: Model<StaffDocument>, applyLeaveRepository: ApplyLeaveRepository, eventEmitter: EventEmitter2);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<ApplyLeaveDocument>;
    create(createDto: CreateApplyLeaveDto): Promise<{
        success: boolean;
    }>;
    find(params?: any): Promise<Omit<import("mongoose").Document<unknown, {}, ApplyLeaveDocument> & import("./entities/apply-leave.entity").ApplyLeave & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[] | {
        items: Omit<import("mongoose").Document<unknown, {}, ApplyLeaveDocument> & import("./entities/apply-leave.entity").ApplyLeave & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateApplyLeaveDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
