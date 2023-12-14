import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';

@Schema({ collection: 'staff_education', versionKey: false, timestamps: true})
export class StaffEducation {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Staff is required'],

    })
    staff_id: string;

    @Prop({
        type: String,
        required: [true, 'College/university name is required'],
    })
    college_name: string;    

    @Prop({
        type: String,
    })
    degree: string;

    @Prop({
        type: String,
    })
    specialization: string;

    @Prop({
        type: String,
    })
    course_type: string;

    @Prop({
        type: String,
    })
    passing_year: string;

    @Prop({
        type: String,
    })
    marks: string;

    @Prop({
        type: Boolean,
        default: false
    })
    recent: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}


export const StaffEducationSchema = SchemaFactory.createForClass(StaffEducation);
export type StaffEducationDocument = StaffEducation & Document;
