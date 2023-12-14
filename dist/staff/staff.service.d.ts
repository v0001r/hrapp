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
import { S3FilesService } from 'src/files/s3-files.service';
import { RedisService } from 'src/redis/redis.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDocument } from './entities/staff.entity';
import { StaffRepository } from './staff.repository';
import { BranchDocument } from 'src/branches/entities/branch.entity';
import { TeamDocument } from 'src/teams/entities/team.entity';
import { RoleDocument } from 'src/roles/entities/role.entity';
import { DepartmentDocument } from 'src/departments/entities/department.entity';
import { DesignationDocument } from 'src/designations/entities/designation.entity';
export declare class StaffService {
    private readonly staffModel;
    private readonly branchModel;
    private readonly teamModel;
    private readonly roleModel;
    private readonly departmentModel;
    private readonly designationModel;
    private readonly staffRepository;
    private readonly s3FilesService;
    private readonly eventEmitter;
    private readonly redisService;
    constructor(staffModel: Model<StaffDocument>, branchModel: Model<BranchDocument>, teamModel: Model<TeamDocument>, roleModel: Model<RoleDocument>, departmentModel: Model<DepartmentDocument>, designationModel: Model<DesignationDocument>, staffRepository: StaffRepository, s3FilesService: S3FilesService, eventEmitter: EventEmitter2, redisService: RedisService);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<StaffDocument>;
    create(createDto: CreateStaffDto, file: any): Promise<{
        success: boolean;
        staff: StaffDocument;
    }>;
    handlestaffsCreatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    find(params?: any): Promise<Omit<Omit<Omit<Omit<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, StaffDocument> & import("./entities/staff.entity").Staff & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>, never>, never>, never>, never>[] | {
        items: Omit<Omit<Omit<Omit<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, StaffDocument> & import("./entities/staff.entity").Staff & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>, never>, never>, never>, never>, never>[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateStaffDto, file: any): Promise<{
        success: boolean;
    }>;
    handlestaffUpdatedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    handlestaffDeletedEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    deleteMany(ids: string[]): Promise<{
        success: boolean;
    }>;
    handlestaffDeletedManyEvent({ payload }: {
        payload: any;
    }): Promise<void>;
    conflicted(params?: any): Promise<void>;
}
