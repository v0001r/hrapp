import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({ collection: 'shifts', versionKey: false, timestamps: true})
export class Shift {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Name is required'],
    })
    name: string;

    @Prop({
        type: String,
    })
    from: string;

    @Prop({
        type: String,
    })
    to: string;

    @Prop({
        type: [String],
    })
    week_off: [String];
    
    @Prop({
        type: String,
    })
    break_type: string;

    @Prop({
        type: String,
    })
    break_time: string;

    @Prop({
        type: String,
    })
    break_start: string;

    @Prop({
        type: String,
    })
    break_end: string;


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

export const ShiftSchema = SchemaFactory.createForClass(Shift);
export type ShiftDocument = Shift & Document;