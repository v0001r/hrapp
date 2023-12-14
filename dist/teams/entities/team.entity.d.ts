import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';
export declare class Team {
    _id: ObjectId;
    name: string;
    lead: Staff;
    code: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TeamSchema: mongoose.Schema<Team, mongoose.Model<Team, any, any, any, mongoose.Document<unknown, any, Team> & Team & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Team, mongoose.Document<unknown, {}, Team> & Team & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type TeamDocument = Team & Document;
