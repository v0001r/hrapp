import { IsString, IsNotEmpty } from 'class-validator';

export class CreateShiftDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    from: any;

    @IsNotEmpty()
    to: any;

    @IsNotEmpty()
    @IsString()
    break_type: string;
    
    @IsString()
    break_time: string;

    @IsString()
    break_start: string;

    @IsString()
    break_end: string;
         
}
