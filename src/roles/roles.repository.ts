import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { RoleDocument } from './entities/role.entity';


@Injectable()
export class RoleRepository extends EntityRepository<RoleDocument> {
  constructor(
    @Inject('Role') private readonly roleModel: Model<RoleDocument>,
  ) {
    super(roleModel);
  }

  async getById(_id: string) {
    let role;
    try {
      role = await this.roleModel.findOne({ _id, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return role;
  }

  async getByName(name: string) {
    let role;
    try {
      role = await this.roleModel.findOne({ name, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return role;
  }

}
