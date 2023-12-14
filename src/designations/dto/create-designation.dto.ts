import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDesignationDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
