import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffDoucumentDocument } from './entities/staff-doucument.entity';


@Injectable()
export class StaffDoucumentRepository extends EntityRepository<StaffDoucumentDocument> {
  constructor(
    @Inject('StaffDoucument') private readonly staffDoucumentModel: Model<StaffDoucumentDocument>,
  ) {
    super(staffDoucumentModel);
  }

  async getById(id: string) {
    let staffDoucument;
    try {
      staffDoucument = await this.staffDoucumentModel.find({ staff_id:id}).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return staffDoucument;
  }

}
