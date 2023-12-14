import mongoose, { Document, ObjectId } from 'mongoose';
export declare class Permission {
    _id: ObjectId;
    name: string;
    display_name: string;
    module: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PermissionSchema: mongoose.Schema<Permission, mongoose.Model<Permission, any, any, any, mongoose.Document<unknown, any, Permission> & Permission & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Permission, mongoose.Document<unknown, {}, Permission> & Permission & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type PermissionDocument = Permission & Document;
