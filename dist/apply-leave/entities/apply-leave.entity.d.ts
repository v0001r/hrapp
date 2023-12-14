import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';
export declare class ApplyLeave {
    _id: ObjectId;
    employee: Staff;
    from: string;
    to: string;
    reason: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ApplyLeaveSchema: mongoose.Schema<ApplyLeave, mongoose.Model<ApplyLeave, any, any, any, mongoose.Document<unknown, any, ApplyLeave> & ApplyLeave & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ApplyLeave, mongoose.Document<unknown, {}, ApplyLeave> & ApplyLeave & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type ApplyLeaveDocument = ApplyLeave & Document;
