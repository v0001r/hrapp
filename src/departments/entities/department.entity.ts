import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';

@Schema({ collection: 'hr_departments', versionKey: false, timestamps: true})
export class Department {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;


    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Department',
    })
    @Type(() => Department)
    parent_department: Department;

    @Prop({
        type: String,
        required: [true, 'Department name is required'],
        unique: [true, 'Department name already exists. The Department name must be unique.']
    })
    name: string;

    @Prop({
        type: String,
        required: [true, 'Department code is required'],
        unique: [true, 'Department with this code already exists. The Department code must be unique.']
    })
    code: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff',
    })
    @Type(() => Staff)
    department_head: Staff;

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


export const DepartmentSchema = SchemaFactory.createForClass(Department);
export type DepartmentDocument = Department & Document;