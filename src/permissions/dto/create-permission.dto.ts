import { IsString, IsNotEmpty} from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    display_name: string;
    
    @IsString()
    @IsNotEmpty()
    module: string;
    
}
