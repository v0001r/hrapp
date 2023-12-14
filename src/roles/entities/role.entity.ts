import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({ collection: 'hr_roles', versionKey: false, timestamps: true})
export class Role {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Role name is required'],
        unique: [true, 'Role name already exists. The permission name must be unique.']
    })
    name: string;

    @Prop({
        type: [String],
    })
    permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = Role & Document;