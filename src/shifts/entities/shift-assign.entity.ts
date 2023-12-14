import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Shift } from './shift.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Branch } from 'src/branches/entities/branch.entity';

@Schema({ collection: 'shift_assign', versionKey: false, timestamps: true})
export class Shiftassign {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
    })
    emp_id: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Team',
    })
    @Type(() => Team)
    team_id: Team;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Shift.name,
        required: [true, 'Shift is required'],
    })
    @Type(() => Shift)
    shift_id: Shift;

    @Prop({
        type: String,
    })
    start_date: string;

    @Prop({
        type: String,
    })
    end_date: string;
    
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ShiftassignSchema = SchemaFactory.createForClass(Shiftassign);
export type ShiftassignDocument = Shiftassign & Document;