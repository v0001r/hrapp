import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffExperienceDto } from './create-staff-experience.dto';

export class UpdateStaffExperienceDto extends PartialType(CreateStaffExperienceDto) {}
