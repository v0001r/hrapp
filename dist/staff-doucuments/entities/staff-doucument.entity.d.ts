import mongoose, { Document, ObjectId } from 'mongoose';
export declare class StaffDoucument {
    _id: ObjectId;
    staff_id: string;
    type: string;
    name: string;
    valid_from: string;
    valid_to: string;
    document: {
        key: string;
        url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const StaffDoucumentSchema: mongoose.Schema<StaffDoucument, mongoose.Model<StaffDoucument, any, any, any, mongoose.Document<unknown, any, StaffDoucument> & StaffDoucument & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StaffDoucument, mongoose.Document<unknown, {}, StaffDoucument> & StaffDoucument & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type StaffDoucumentDocument = StaffDoucument & Document;
