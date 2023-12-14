import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';

@Schema({ collection: 'hr_teams', versionKey: false, timestamps: true})
export class Team {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Team name is required'],
        unique: [true, 'Team name already exists. The Team name must be unique.']
    })
    name: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff',
        required: [true, 'Team Lead is required'],
    })
    @Type(() => Staff)
    lead: Staff;

    @Prop({
        type: String,
        required: [true, 'Team code is required'],
        unique: [true, 'Team with this code already exists. The Team code must be unique.']
    })
    code: string;


    @Prop({
        type: Boolean,
        default: true
    })
    status: boolean;


    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}


export const TeamSchema = SchemaFactory.createForClass(Team);
export type TeamDocument = Team & Document;

