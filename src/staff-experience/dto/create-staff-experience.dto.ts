import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStaffExperienceDto {
    
    @IsString()
    @IsNotEmpty()
    company_name: string;
    
    @IsString()
    @IsNotEmpty()
    designation: string;
    
    @IsString()
    @IsNotEmpty()
    duration: string;
    
    @IsString()
    @IsNotEmpty()
    joining_date: string;
    
    @IsString()
    probation: string;
    
    @IsString()
    timezone: string;
    
    @IsString()
    skills: string;
    
    @IsString()
    experinece: string;
    
    @IsString()
    current_experinece: string;
}
