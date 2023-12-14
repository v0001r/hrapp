import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';


@Schema({ collection: 'hr_branches', versionKey: false, timestamps: true})
export class Branch {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Branch name is required'],
        unique: [true, 'Branch name already exists. The branch name must be unique.']
    })
    name: string;

    @Prop({
        type: String,
        required: [true, 'Branch code is required'],
        unique: [true, 'Branch with this code already exists. The branch code must be unique.']
    })
    code: string;

    @Prop({
        type: String,
    })
    address: string;

    @Prop({
        type: String,
    })
    landmark: string;

    @Prop({
        type: String,
        required: [true, 'City is required'],
    })
    city: string;

    @Prop({
        type: String,
        required: [true, 'State is required'],
    })
    state: string;

    @Prop({
        type: String,
        required: [true, 'Pincode is required'],
    })
    pincode: string;

    @Prop({
        type: String,
        required: [true, 'Country is required'],
    })
    country: string;

    @Prop({
        type: Boolean,
        default: true
    })
    status: boolean;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff',
    })
    @Type(() => Staff)
    branch_head: Staff;

    @Prop({
        type: Boolean,
        default: false
    })
    head_office: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
export type BranchDocument = Branch & Document;
