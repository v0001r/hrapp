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
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamDocument } from './entities/team.entity';
import { TeamRepository } from './teams.repository';
import { StaffDocument } from 'src/staff/entities/staff.entity';
export declare class TeamsService {
    private readonly teamModel;
    private readonly staffModel;
    private readonly teamRepository;
    private readonly eventEmitter;
    private readonly redisService;
    constructor(teamModel: Model<TeamDocument>, staffModel: Model<StaffDocument>, teamRepository: TeamRepository, eventEmitter: EventEmitter2, redisService: RedisService);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<Omit<import("mongoose").Document<unknown, {}, TeamDocument> & import("./entities/team.entity").Team & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    create(createDto: CreateTeamDto): Promise<{
        success: boolean;
    }>;
    handleteamsCreatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    find(params?: any): Promise<Omit<import("mongoose").Document<unknown, {}, TeamDocument> & import("./entities/team.entity").Team & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[] | {
        items: Omit<import("mongoose").Document<unknown, {}, TeamDocument> & import("./entities/team.entity").Team & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateTeamDto): Promise<{
        success: boolean;
    }>;
    handleteamUpdatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    handleteamDeletedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
}
