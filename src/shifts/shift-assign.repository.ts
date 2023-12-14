import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { ShiftassignDocument } from './entities/shift-assign.entity';


@Injectable()
export class ShiftassignRepository extends EntityRepository<ShiftassignDocument> {
  constructor(
    @Inject('Shiftassign') private readonly shiftassignModel: Model<ShiftassignDocument>,
  ) {
    super(shiftassignModel);
  }

}
