import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateStaffEducationDto } from './dto/create-staff-education.dto';
import { UpdateStaffEducationDto } from './dto/update-staff-education.dto';
import { StaffEducationDocument } from './entities/staff-education.entity';
import { StaffDocument } from 'src/staff/entities/staff.entity';
import { StaffEducationRepository } from './staff-education.repository';

@Injectable()
export class StaffEducationService {
  constructor(
    @Inject('StaffEducation') private readonly staffEducationModel: Model<StaffEducationDocument>,
    private readonly staffEducationRepository: StaffEducationRepository,
    private readonly eventEmitter: EventEmitter2,
) {}

async findOne(
 id
) {
;

  const exp = await this.staffEducationRepository.getById(id);
  if (!exp) throw new NotFoundException();

  return exp;
}

async create(createDto: CreateStaffEducationDto) {

  try {
     const expCreated = await this.staffEducationRepository.create({...createDto});

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
  const query = this.staffEducationModel.find(options).sort(sort);


  return await query.exec();
}

async update(id: string, updateDto: UpdateStaffEducationDto ) {
  const expData = await this.staffEducationRepository.findOne({_id: id});
  if(!expData) {
    throw new NotFoundException();
  }

  const exp = await this.staffEducationRepository.findOneAndUpdate(
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
  const exp = await this.staffEducationRepository.findOne({_id: id});
  if(!exp) throw new NotFoundException();

  const deleted = await this.staffEducationRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}
}
