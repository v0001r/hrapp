import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Branch } from 'src/branches/entities/branch.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Designation } from 'src/designations/entities/designation.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Team } from 'src/teams/entities/team.entity';


@Schema({ collection: 'hr_staff', versionKey: false, timestamps: true})
export class Staff {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: String,
        required: [true, 'Salutation is required'],
    })
    salutation: string;
    
    @Prop({
        type: String,
        required: [true, 'First name is required'],
    })
    first_name: string;

    @Prop()
    middle_name: string;

    @Prop({
        type: String,
        required: [true, 'Last name is required'],
    })
    last_name: string;

    @Prop({
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Staff with this email already exists. The email must be unique.']
    })
    email: string;

    @Prop({
        type: String,
    })
    work_email: string;

    @Prop({
        type: String,
    })
    personal_email: string;

    @Prop({
        type: String,
        required: [true, 'Gross salary is required'],
    })
    gross_salary: string;

    @Prop({
        type: String,
        required: [true, 'CTC is required'],
    })
    ctc: string;

    @Prop({
        type: String,
        required: [true, 'Phone is required'],
        unique: [true, 'Staff with this phone number already exists. The phone number must be unique.']
    })
    phone: string;

    @Prop({
        type: String,
    })
    personal_phone: string;

    @Prop({
        type: String,
    })
    alt_phone: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
        required: [true, 'Branch is required'],
        index: true
      })
    @Type(() => Branch)
    branch_id: Branch;


    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
        required: [true, 'Team is required'],
        index: true
      })
    @Type(() => Team)
    team_id: Team;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Department.name }],
        required: [true, 'Department is required'],
        index: true
      })
    @Type(() => Department)
    department_id: Department;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff', // Reference to the Staff model
        required: [true, 'Reporting manager is required'],
      })
      @Type(() => Staff)
      primary_reporting: Staff;

    @Prop({
       type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }],
       index: true
    })
    @Type(() => Staff)
    secondary_reporting: Staff[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: Role.name,
        required: [true, 'Role is required'],
    })
    @Type(() => Role)
    role: Role;

  
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Designation.name,
        required: [true, 'Designation is required'],
    })
    @Type(() => Designation)
    designation: Designation;

    @Prop({type: String,})
    dob: string;

    @Prop({
        type: String,
    })
    gender: string;

    @Prop({
        type: String,
    })
    address: string;

    @Prop({
        type: String,
    })
    present_address: string;

    @Prop({
        type: String,
    })
    place_of_birth: string;

    @Prop({
        type: String,
    })
    nationality: string;

    @Prop({
        type: String,
    })
    blood_group: string;

    @Prop({
        type: String,
    })
    marital_status: string;

    @Prop({
        type: String,
    })
    aniversary_date: string;

    @Prop({
        type: String,
    })
    adhaar_number: string;

    @Prop({
        type: String,
    })
    pan_number: string;

    @Prop({
        type: String,
    })
    bank_acc_no: string;

    @Prop({
        type: String,
    })
    bank_name: string;

    @Prop({
        type: String,
    })
    branch_name: string;

    @Prop({
        type: String,
    })
    ifsc_code: string;

    @Prop({
        type: String,
    })
    employement_type: string;

    @Prop({
        type: String,
    })
    pt_amount: string;

    @Prop({
        type: Boolean,
        default: false
    })
    physically_challenged: boolean;

    @Prop({
        type: String,
    })
    cost_center: string;

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
        required: [true, 'Country is required'],
    })
    country: string;

    @Prop({
        type: String,
        required: [true, 'Employee Id is required'],
    })
    emp_id: string;

    @Prop({
        type: String
    })
    incentive_type: string;

    @Prop({
        type: String
    })
    incentive_amount: string;


    @Prop({ 
        type: {key: String, url: String},
    })
    image: {key: string, url: string};

    @Prop({
        type: String,
    })
    ip: string;
  
    @Prop({
        type: String,
    })
    mac_address: string;

    @Prop({
        type:Boolean,
        default: false
    })
    workshift: boolean;
    
    @Prop({
        type: Boolean,
        default: true
    })
    status: boolean;

    @Prop({
        type: String,
    })
    emergancy_name: string;

    @Prop({
        type: String,
    })
    emergancy_relation: string;

    @Prop({
        type: String,
    })
    emergancy_phone: string;

    @Prop({
        type: String,
    })
    emergancy_address: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
    
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
export type StaffDocument = Staff & Document;
