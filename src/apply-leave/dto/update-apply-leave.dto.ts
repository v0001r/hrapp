import { PartialType } from '@nestjs/mapped-types';
import { CreateApplyLeaveDto } from './create-apply-leave.dto';

export class UpdateApplyLeaveDto extends PartialType(CreateApplyLeaveDto) {}
