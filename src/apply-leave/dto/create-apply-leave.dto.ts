import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApplyLeaveDto {
    
    @IsNotEmpty()
    from: string;

    @IsNotEmpty()
    to: string;

    @IsNotEmpty()
    type: string;
         
    @IsString()
    @IsNotEmpty()
    reason: string;

}
