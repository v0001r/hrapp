import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum } from 'class-validator';
 
 export class CreateStaffDto {
    
    @IsString()
    @IsNotEmpty()
    salutation: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    middle_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

   //  @IsString()
   //  @IsNotEmpty()
   //  work_email: string;

   //  @IsString()
   //  @IsNotEmpty()
   //  personal_email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

   //  @IsString()
   //  @IsNotEmpty()
   //  personal_phone: string;

    @IsString()
    @IsNotEmpty()
    gross_salary: string;

    @IsString()
    @IsNotEmpty()
    ctc: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    emp_id: string;

    @IsString()
    ip: string;

    @IsString()
    mac_address: string;

    password: any;
 }
