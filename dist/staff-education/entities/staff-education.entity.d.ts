import mongoose, { Document, ObjectId } from 'mongoose';
export declare class StaffEducation {
    _id: ObjectId;
    staff_id: string;
    college_name: string;
    degree: string;
    specialization: string;
    course_type: string;
    passing_year: string;
    marks: string;
    recent: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const StaffEducationSchema: mongoose.Schema<StaffEducation, mongoose.Model<StaffEducation, any, any, any, mongoose.Document<unknown, any, StaffEducation> & StaffEducation & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StaffEducation, mongoose.Document<unknown, {}, StaffEducation> & StaffEducation & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type StaffEducationDocument = StaffEducation & Document;
