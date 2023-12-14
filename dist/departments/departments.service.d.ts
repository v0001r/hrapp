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
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentDocument } from './entities/department.entity';
import { DepartmentRepository } from './departments.repository';
import { StaffDocument } from 'src/staff/entities/staff.entity';
export declare class DepartmentsService {
    private readonly departmentModel;
    private readonly staffModel;
    private readonly departmentRepository;
    private readonly eventEmitter;
    constructor(departmentModel: Model<DepartmentDocument>, staffModel: Model<StaffDocument>, departmentRepository: DepartmentRepository, eventEmitter: EventEmitter2);
    findOne(params?: Record<string, unknown>, projection?: Record<string, unknown>): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, DepartmentDocument> & import("./entities/department.entity").Department & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    create(createDto: CreateDepartmentDto): Promise<{
        success: boolean;
    }>;
    find(params?: any): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, DepartmentDocument> & import("./entities/department.entity").Department & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[] | {
        items: Omit<Omit<import("mongoose").Document<unknown, {}, DepartmentDocument> & import("./entities/department.entity").Department & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        count: number;
    }>;
    update(id: string, updateDto: UpdateDepartmentDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
