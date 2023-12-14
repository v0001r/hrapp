import mongoose, { Document, ObjectId } from 'mongoose';
export declare class Designation {
    _id: ObjectId;
    name: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DesignationSchema: mongoose.Schema<Designation, mongoose.Model<Designation, any, any, any, mongoose.Document<unknown, any, Designation> & Designation & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Designation, mongoose.Document<unknown, {}, Designation> & Designation & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type DesignationDocument = Designation & Document;
