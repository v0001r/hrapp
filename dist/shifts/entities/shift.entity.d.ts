import mongoose, { Document, ObjectId } from 'mongoose';
export declare class Shift {
    _id: ObjectId;
    name: string;
    from: string;
    to: string;
    week_off: [String];
    break_type: string;
    break_time: string;
    break_start: string;
    break_end: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ShiftSchema: mongoose.Schema<Shift, mongoose.Model<Shift, any, any, any, mongoose.Document<unknown, any, Shift> & Shift & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Shift, mongoose.Document<unknown, {}, Shift> & Shift & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type ShiftDocument = Shift & Document;
