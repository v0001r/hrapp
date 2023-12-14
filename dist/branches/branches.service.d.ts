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
import { BranchRepository } from './branches.repository';
import { RedisService } from 'src/redis/redis.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchDocument } from './entities/branch.entity';
import { StaffDocument } from 'src/staff/entities/staff.entity';
export declare class BranchesService {
    private readonly branchModel;
    private readonly staffModel;
    private readonly branchRepository;
    private readonly eventEmitter;
    private readonly redisService;
    constructor(branchModel: Model<BranchDocument>, staffModel: Model<StaffDocument>, branchRepository: BranchRepository, eventEmitter: EventEmitter2, redisService: RedisService);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<Omit<import("mongoose").Document<unknown, {}, BranchDocument> & import("./entities/branch.entity").Branch & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    create(createDto: CreateBranchDto): Promise<{
        success: boolean;
    }>;
    handlebranchsCreatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    find(params?: any): Promise<Omit<import("mongoose").Document<unknown, {}, BranchDocument> & import("./entities/branch.entity").Branch & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[] | {
        items: Omit<import("mongoose").Document<unknown, {}, BranchDocument> & import("./entities/branch.entity").Branch & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateBranchDto): Promise<{
        success: boolean;
    }>;
    handlebranchUpdatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    handlebranchDeletedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
}
