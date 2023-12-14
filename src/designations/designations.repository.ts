import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { DesignationDocument } from './entities/designation.entity';


@Injectable()
export class DesignationRepository extends EntityRepository<DesignationDocument> {
  constructor(
    @Inject('Designation') private readonly designationModel: Model<DesignationDocument>,
  ) {
    super(designationModel);
  }


  async getByName(name: string) {
    let designation;
    try {
      designation = await this.designationModel.findOne({ name }, '_id name').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return designation;
  }

}
