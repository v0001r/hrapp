import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { PermissionDocument } from './entities/permission.entity';


@Injectable()
export class PermissionRepository extends EntityRepository<PermissionDocument> {
  constructor(
    @Inject('Permission') private readonly permissionModel: Model<PermissionDocument>,
  ) {
    super(permissionModel);
  }

  async getById(_id: string) {
    let permission;
    try {
      permission = await this.permissionModel.findOne({ _id, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return permission;
  }

  async getByName(name: string) {
    let permission;
    try {
      permission = await this.permissionModel.findOne({ name, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return permission;
  }

}
