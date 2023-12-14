import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({ collection: 'staff_experience', versionKey: false, timestamps: true})
export class StaffDoucument {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Staff is required'],

    })
    staff_id: string;

    @Prop({
        type: String,
        required: [true, 'Document type is required'],
    })
    type: string;   

    @Prop({
        type: String,
    })
    name: string;   

    @Prop({
        type: String,
    })
    valid_from: string;   

    @Prop({
        type: String,
    })
    valid_to: string; 

    @Prop({ 
        type: {key: String, url: String},
    })
    document: {key: string, url: string};

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}


export const StaffDoucumentSchema = SchemaFactory.createForClass(StaffDoucument);
export type StaffDoucumentDocument = StaffDoucument & Document;
