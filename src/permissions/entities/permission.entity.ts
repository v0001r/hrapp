import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({ collection: 'hr_permissions', versionKey: false, timestamps: true})
export class Permission {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Permission name is required'],
        unique: [true, 'Permission name already exists. The permission name must be unique.']
    })
    name: string;

    @Prop({
        type: String,
        required: [true, 'Permission display name is required'],
    })
    display_name: string;

    @Prop({
        type: String,
        required: [true, 'Module is required'],
    })
    module: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
export type PermissionDocument = Permission & Document;
