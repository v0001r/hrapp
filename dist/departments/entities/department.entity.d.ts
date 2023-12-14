import mongoose, { Document, ObjectId } from 'mongoose';
import { Staff } from 'src/staff/entities/staff.entity';
export declare class Department {
    _id: ObjectId;
    parent_department: Department;
    name: string;
    code: string;
    department_head: Staff;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DepartmentSchema: mongoose.Schema<Department, mongoose.Model<Department, any, any, any, mongoose.Document<unknown, any, Department> & Department & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Department, mongoose.Document<unknown, {}, Department> & Department & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type DepartmentDocument = Department & Document;
