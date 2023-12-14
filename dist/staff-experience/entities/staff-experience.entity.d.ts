import mongoose, { Document, ObjectId } from 'mongoose';
export declare class StaffExperience {
    _id: ObjectId;
    staff_id: string;
    company_name: string;
    designation: string;
    duration: string;
    joining_date: string;
    releving_date: string;
    probation: string;
    timezone: string;
    skills: string;
    experience: string;
    current_experience: string;
    current_employer: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const StaffExperienceSchema: mongoose.Schema<StaffExperience, mongoose.Model<StaffExperience, any, any, any, mongoose.Document<unknown, any, StaffExperience> & StaffExperience & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StaffExperience, mongoose.Document<unknown, {}, StaffExperience> & StaffExperience & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type StaffExperienceDocument = StaffExperience & Document;
