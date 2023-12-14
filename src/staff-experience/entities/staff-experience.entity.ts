import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({ collection: 'staff_experience', versionKey: false, timestamps: true})
export class StaffExperience {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Staff is required'],
    })
    staff_id: string;

    @Prop({
        type: String,
        required: [true, 'Company Name is required'],
    })
    company_name: string;


    @Prop({
        type: String,
    })
    designation: string;

    @Prop({
        type: String,
    })
    duration: string;

    @Prop({
        type: String,
    })
    joining_date: string;

    @Prop({
        type: String,
    })
    releving_date: string;

    @Prop({
        type: String,
    })
    probation: string;

    @Prop({
        type: String,
    })
    timezone: string;

    @Prop({
        type: String,
    })
    skills: string;

    @Prop({
        type: String,
    })
    experience: string;

    @Prop({
        type: String,
    })
    current_experience: string;

    @Prop({
        type: Boolean,
        default: false,
    })
    current_employer: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}


export const StaffExperienceSchema = SchemaFactory.createForClass(StaffExperience);
export type StaffExperienceDocument = StaffExperience & Document;