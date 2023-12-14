import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { ShiftDocument } from './entities/shift.entity';


@Injectable()
export class ShiftRepository extends EntityRepository<ShiftDocument> {
  constructor(
    @Inject('Shift') private readonly shiftModel: Model<ShiftDocument>,
  ) {
    super(shiftModel);
  }


  async getByName(name: string) {
    let team;
    try {
      team = await this.shiftModel.findOne({ name }, '_id name').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return team;
  }

}
