import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffEducationDocument } from './entities/staff-education.entity';


@Injectable()
export class StaffEducationRepository extends EntityRepository<StaffEducationDocument> {
  constructor(
    @Inject('StaffEducation') private readonly staffEducationModel: Model<StaffEducationDocument>,
  ) {
    super(staffEducationModel);
  }

  async getById(id: string) {
    let staffEducation;
    try {
      staffEducation = await this.staffEducationModel.find({ staff_id:id}).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return staffEducation;
  }

}
