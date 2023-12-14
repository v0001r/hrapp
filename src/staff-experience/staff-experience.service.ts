import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateStaffExperienceDto } from './dto/create-staff-experience.dto';
import { UpdateStaffExperienceDto } from './dto/update-staff-experience.dto';
import { StaffExperienceRepository } from './staff-experience.repository';
import { StaffExperienceDocument } from './entities/staff-experience.entity';
import { StaffDocument } from 'src/staff/entities/staff.entity';

@Injectable()
export class StaffExperienceService {
  constructor(
    @Inject('StaffExperience') private readonly staffExperienceModel: Model<StaffExperienceDocument>,
    private readonly staffExperienceRepository: StaffExperienceRepository,
    private readonly eventEmitter: EventEmitter2,
) {}
  
async findOne(
 id
) {
;

  const exp = await this.staffExperienceRepository.getById(id);
  if (!exp) throw new NotFoundException();

  return exp;
}

async create(createDto: CreateStaffExperienceDto) {

  try {
     const expCreated = await this.staffExperienceRepository.create({...createDto});

    if(!expCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('department.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}


async find(params: any = {}) {
  let options: {
    $or?: any;
    createdAt?: any;
  } = {};

  let sort = {
    createdAt: "desc" as any
  };
  if(params.sortBy) {
    sort[params.sortBy] = params.sortDir || 'asc';
  }

  // generate query
  const query = this.staffExperienceModel.find(options).sort(sort);


  return await query.exec();
}

async update(id: string, updateDto: UpdateStaffExperienceDto ) {
  const expData = await this.staffExperienceRepository.findOne({_id: id});
  if(!expData) {
    throw new NotFoundException();
  }

  const exp = await this.staffExperienceRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!exp)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  return {success: true};
}

async delete(id: string) {
  const exp = await this.staffExperienceRepository.findOne({_id: id});
  if(!exp) throw new NotFoundException();

  const deleted = await this.staffExperienceRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}


}
