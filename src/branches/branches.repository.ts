import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { BranchDocument } from './entities/branch.entity';


@Injectable()
export class BranchRepository extends EntityRepository<BranchDocument> {
  constructor(
    @Inject('Branch') private readonly branchModel: Model<BranchDocument>,
  ) {
    super(branchModel);
  }

  async getById(_id: string) {
    let branch;
    try {
      branch = await this.branchModel.findOne({ _id, status: true }, '_id name code status').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return branch;
  }

  async getByName(name: string) {
    let branch;
    try {
      branch = await this.branchModel.findOne({ name, status: true }, '_id name code status').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return branch;
  }

}
