import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDoucumentDto } from './create-staff-doucument.dto';

export class UpdateStaffDoucumentDto extends PartialType(CreateStaffDoucumentDto) {}
