import mongoose, { Document, ObjectId } from 'mongoose';
export declare class Role {
    _id: ObjectId;
    name: string;
    permissions: string[];
}
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, mongoose.Document<unknown, any, Role> & Role & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, Role> & Role & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type RoleDocument = Role & Document;
