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
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    private readonly request;
    constructor(branchesService: BranchesService, request: Request);
    apiCkeck(): {
        all: string;
    };
    create(createDto: CreateBranchDto): Promise<{
        success: boolean;
    }>;
    findAll(req: Request): Promise<Omit<import("mongoose").Document<unknown, {}, import("./entities/branch.entity").BranchDocument> & import("./entities/branch.entity").Branch & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[] | {
        items: Omit<import("mongoose").Document<unknown, {}, import("./entities/branch.entity").BranchDocument> & import("./entities/branch.entity").Branch & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        count: number;
    }>;
    findOne({ id }: ParamsWithId): Promise<Omit<import("mongoose").Document<unknown, {}, import("./entities/branch.entity").BranchDocument> & import("./entities/branch.entity").Branch & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    update({ id }: ParamsWithId, updateDto: UpdateBranchDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}