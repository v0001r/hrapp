import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { DepartmentDocument } from './entities/department.entity';


@Injectable()
export class DepartmentRepository extends EntityRepository<DepartmentDocument> {
  constructor(
    @Inject('Department') private readonly departmentModel: Model<DepartmentDocument>,
  ) {
    super(departmentModel);
  }

  async getById(_id: string) {
    let department;
    try {
      department = await this.departmentModel.findOne({ _id}, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return department;
  }

  async getByName(name: string) {
    let department;
    try {
      department = await this.departmentModel.findOne({ name }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return department;
  }

}
