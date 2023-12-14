import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';

@Schema({ collection: 'leaves', versionKey: false, timestamps: true})
export class ApplyLeave {

    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff',
    })
    @Type(() => Staff)
    employee: Staff;

    @Prop({
        type: String,
    })
    from: string;

    @Prop({
        type: String,
     })
    to: string;

    @Prop({ 
        type: String,
        required: [true, 'Leave Reason is required'],
    })
    reason: string;

    @Prop({ 
        type: String,
    })
    type: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}



export const ApplyLeaveSchema = SchemaFactory.createForClass(ApplyLeave);
export type ApplyLeaveDocument = ApplyLeave & Document;