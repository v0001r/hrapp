import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStaffEducationDto {
       
    @IsString()
    @IsNotEmpty()
    staff_id: string;
       
    @IsString()
    @IsNotEmpty()
    college_name: string;
       
    @IsString()
    degree: string;
       
    @IsString()
    specialization: string;
       
    @IsString()
    course_type: string;
       
    @IsString()
    passing_year: string;
       
    @IsString()
    marks: string;

}
