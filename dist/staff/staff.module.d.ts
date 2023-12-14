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
import { Connection } from 'mongoose';
export declare const TenantModelProviders: ({
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("./entities/staff.entity").Staff, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./entities/staff.entity").Staff> & import("./entities/staff.entity").Staff & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>, import("mongoose").Schema<import("./entities/staff.entity").Staff, import("mongoose").Model<import("./entities/staff.entity").Staff, any, any, any, import("mongoose").Document<unknown, any, import("./entities/staff.entity").Staff> & import("./entities/staff.entity").Staff & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./entities/staff.entity").Staff, import("mongoose").Document<unknown, {}, import("./entities/staff.entity").Staff> & import("./entities/staff.entity").Staff & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("src/roles/entities/role.entity").Role, {}, {}, {}, import("mongoose").Document<unknown, {}, import("src/roles/entities/role.entity").Role> & import("src/roles/entities/role.entity").Role & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>, import("mongoose").Schema<import("src/roles/entities/role.entity").Role, import("mongoose").Model<import("src/roles/entities/role.entity").Role, any, any, any, import("mongoose").Document<unknown, any, import("src/roles/entities/role.entity").Role> & import("src/roles/entities/role.entity").Role & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("src/roles/entities/role.entity").Role, import("mongoose").Document<unknown, {}, import("src/roles/entities/role.entity").Role> & import("src/roles/entities/role.entity").Role & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("src/designations/entities/designation.entity").Designation, {}, {}, {}, import("mongoose").Document<unknown, {}, import("src/designations/entities/designation.entity").Designation> & import("src/designations/entities/designation.entity").Designation & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>, import("mongoose").Schema<import("src/designations/entities/designation.entity").Designation, import("mongoose").Model<import("src/designations/entities/designation.entity").Designation, any, any, any, import("mongoose").Document<unknown, any, import("src/designations/entities/designation.entity").Designation> & import("src/designations/entities/designation.entity").Designation & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("src/designations/entities/designation.entity").Designation, import("mongoose").Document<unknown, {}, import("src/designations/entities/designation.entity").Designation> & import("src/designations/entities/designation.entity").Designation & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>>;
    inject: string[];
})[];
export declare class StaffModule {
}