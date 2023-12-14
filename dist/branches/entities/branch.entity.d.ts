import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';
export declare class Branch {
    _id: ObjectId;
    name: string;
    code: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    status: boolean;
    branch_head: Staff;
    head_office: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const BranchSchema: mongoose.Schema<Branch, mongoose.Model<Branch, any, any, any, mongoose.Document<unknown, any, Branch> & Branch & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Branch, mongoose.Document<unknown, {}, Branch> & Branch & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type BranchDocument = Branch & Document;
