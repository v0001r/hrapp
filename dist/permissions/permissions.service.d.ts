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
import { PermissionRepository } from './permissions.repository';
import { RedisService } from 'src/redis/redis.service';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionDocument } from './entities/permission.entity';
export declare class PermissionsService {
    private readonly permissionModel;
    private readonly permissionRepository;
    private readonly eventEmitter;
    private readonly redisService;
    constructor(permissionModel: Model<PermissionDocument>, permissionRepository: PermissionRepository, eventEmitter: EventEmitter2, redisService: RedisService);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<PermissionDocument>;
    create(createDto: UpdatePermissionDto): Promise<{
        success: boolean;
    }>;
    handlepermisionsCreatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    find(params?: any): Promise<(import("mongoose").Document<unknown, {}, PermissionDocument> & import("./entities/permission.entity").Permission & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        items: (import("mongoose").Document<unknown, {}, PermissionDocument> & import("./entities/permission.entity").Permission & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
}
