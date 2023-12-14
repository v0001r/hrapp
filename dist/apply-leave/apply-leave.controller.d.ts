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
import { ApplyLeaveService } from './apply-leave.service';
import { CreateApplyLeaveDto } from './dto/create-apply-leave.dto';
import { UpdateApplyLeaveDto } from './dto/update-apply-leave.dto';
export declare class ApplyLeaveController {
    private readonly applyLeaveService;
    constructor(applyLeaveService: ApplyLeaveService);
    create(createDto: CreateApplyLeaveDto): Promise<{
        success: boolean;
    }>;
    findAll(req: Request): Promise<Omit<import("mongoose").Document<unknown, {}, import("./entities/apply-leave.entity").ApplyLeaveDocument> & import("./entities/apply-leave.entity").ApplyLeave & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[] | {
        items: Omit<import("mongoose").Document<unknown, {}, import("./entities/apply-leave.entity").ApplyLeaveDocument> & import("./entities/apply-leave.entity").ApplyLeave & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        count: number;
    }>;
    findOne({ id }: ParamsWithId): Promise<import("./entities/apply-leave.entity").ApplyLeaveDocument>;
    update({ id }: ParamsWithId, updateDto: UpdateApplyLeaveDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
