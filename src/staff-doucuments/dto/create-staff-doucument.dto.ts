import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStaffDoucumentDto {

    @IsString()
    @IsNotEmpty()
    staff_id: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    valid_from: string;

    @IsString()
    @IsNotEmpty()
    valid_to: string;

}
