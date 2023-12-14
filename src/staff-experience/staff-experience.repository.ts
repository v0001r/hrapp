import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffExperienceDocument } from './entities/staff-experience.entity';


@Injectable()
export class StaffExperienceRepository extends EntityRepository<StaffExperienceDocument> {
  constructor(
    @Inject('StaffExperience') private readonly staffExperienceModel: Model<StaffExperienceDocument>,
  ) {
    super(staffExperienceModel);
  }

  async getById(id: string) {
    let staffExperience;
    try {
      staffExperience = await this.staffExperienceModel.find({ staff_id:id}).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return staffExperience;
  }

}
