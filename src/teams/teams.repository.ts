import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { TeamDocument } from './entities/team.entity';


@Injectable()
export class TeamRepository extends EntityRepository<TeamDocument> {
  constructor(
    @Inject('Team') private readonly teamModel: Model<TeamDocument>,
  ) {
    super(teamModel);
  }

  async getById(_id: string) {
    let team;
    try {
      team = await this.teamModel.findOne({ _id, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return team;
  }

  async getByName(name: string) {
    let team;
    try {
      team = await this.teamModel.findOne({ name, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return team;
  }

  async getByCode(code: string) {
    let team;
    try {
      team = await this.teamModel.findOne({ code, status: true }, '_id name code').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return team;
  }

}
