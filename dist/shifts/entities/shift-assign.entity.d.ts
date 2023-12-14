import mongoose, { Document, ObjectId } from 'mongoose';
import { Shift } from './shift.entity';
import { Team } from 'src/teams/entities/team.entity';
export declare class Shiftassign {
    _id: ObjectId;
    emp_id: string;
    team_id: Team;
    shift_id: Shift;
    start_date: string;
    end_date: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ShiftassignSchema: mongoose.Schema<Shiftassign, mongoose.Model<Shiftassign, any, any, any, mongoose.Document<unknown, any, Shiftassign> & Shiftassign & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Shiftassign, mongoose.Document<unknown, {}, Shiftassign> & Shiftassign & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type ShiftassignDocument = Shiftassign & Document;
