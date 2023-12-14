import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export class CreateBranchDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    code: string;
    
    @IsString()
    address: string;

    @IsString()
    landmark: string;
    
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;
 
    @IsString()
    @IsNotEmpty()
    pincode: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    contact_name: string;

    contact_email: string;

    contact_mobile: string;

    @IsBoolean()
    status: boolean;

    @IsBoolean()
    head_office: boolean;

}
