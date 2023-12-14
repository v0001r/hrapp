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
import { RedisService } from 'src/redis/redis.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDocument } from './entities/role.entity';
import { RoleRepository } from './roles.repository';
export declare class RolesService {
    private readonly roleModel;
    private readonly roleRepository;
    private readonly eventEmitter;
    private readonly redisService;
    constructor(roleModel: Model<RoleDocument>, roleRepository: RoleRepository, eventEmitter: EventEmitter2, redisService: RedisService);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<RoleDocument>;
    create(createDto: CreateRoleDto): Promise<{
        success: boolean;
    }>;
    handlerolesCreatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    find(params?: any): Promise<(import("mongoose").Document<unknown, {}, RoleDocument> & import("./entities/role.entity").Role & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        items: (import("mongoose").Document<unknown, {}, RoleDocument> & import("./entities/role.entity").Role & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateRoleDto): Promise<{
        success: boolean;
    }>;
    handleroleUpdatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    handleroleDeletedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
}
