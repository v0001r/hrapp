import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { ApplyLeaveDocument } from './entities/apply-leave.entity';


@Injectable()
export class ApplyLeaveRepository extends EntityRepository<ApplyLeaveDocument> {
  constructor(
    @Inject('ApplyLeave') private readonly ApplyLeaveModel: Model<ApplyLeaveDocument>,
  ) {
    super(ApplyLeaveModel);
  }

 
  async getByUser(id: any) {
    let applyLeave;
    try {
      applyLeave = await this.ApplyLeaveModel.find({ _id: id }, '_id user_id from to').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return applyLeave;
  }

}
