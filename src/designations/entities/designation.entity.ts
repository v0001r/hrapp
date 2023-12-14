import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({ collection: 'designations', versionKey: false, timestamps: true})
export class Designation {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Designation name is required'],
    })
    name: string;

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


export const DesignationSchema = SchemaFactory.createForClass(Designation);
export type DesignationDocument = Designation & Document;
