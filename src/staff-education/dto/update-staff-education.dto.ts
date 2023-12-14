import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffEducationDto } from './create-staff-education.dto';

export class UpdateStaffEducationDto extends PartialType(CreateStaffEducationDto) {}
