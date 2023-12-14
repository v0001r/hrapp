import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffDocument } from './entities/staff.entity';


@Injectable()
export class StaffRepository extends EntityRepository<StaffDocument> {
  constructor(
    @Inject('Staff') private readonly staffModel: Model<StaffDocument>,
  ) {
    super(staffModel);
  }

  async getById(_id: string) {
    let branch;
    try {
      branch = await this.staffModel.findOne({ _id, status: true }, '_id first_name status').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return branch;
  }

  async getByName(name: string) {
    let branch;
    try {
      branch = await this.staffModel.findOne({ name, status: 1 }, '_id first_name status').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return branch;
  }

  async getByEmail(email: string) {
    let staff;
    try {
      staff = await this.staffModel.findOne({email}, '_id first_name email').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return staff;
  }

  async getByPhone(phone: string) {
    let staff;
    try {
      staff = await this.staffModel.findOne({phone}, '_id first_name phone').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return staff;
  }
}
