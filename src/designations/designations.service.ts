import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { DesignationDocument } from './entities/designation.entity';
import { DesignationRepository } from './designations.repository';
import { DESIGNATION_CACHE_KEY } from 'src/cache-keys.constant';

@Injectable()
export class DesignationsService {

  constructor(
    @Inject('Designation') private readonly designationModel: Model<DesignationDocument>,
    private readonly designationRepository: DesignationRepository,
    private readonly eventEmitter: EventEmitter2,
) {}

async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${DESIGNATION_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;

  const designation = await this.designationRepository.findOne(params, projection);
  if (!designation) throw new NotFoundException();
  // console.log('111', designation);
  // await this.redisService.set(CACHE_KEY, designation, 0);
  return designation;
}

async create(createDto: CreateDesignationDto) {

  console.log('1111', createDto);
  let designation;

  designation = await this.designationRepository.getByName(createDto.name);
  if (designation) {
    throw new ConflictException('designation with given name already exists');
  }
  try {
     const designationCreated = await this.designationRepository.create(createDto);

    if(!designationCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('designation.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

// @OnEvent('designation.created')
// async handledesignationsCreatedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(designation_CACHE_KEY);
// }
async find(params: any = {}) {
  const { s, filters, sortBy, sortDir, page, limit, status } = params;

  const options: any = {};

  // Build the common search keywords with a $or operator
  if (s) {
    options.$or = [
      { name: new RegExp(s, 'i') },
      { code: new RegExp(s, 'i') },
    ];
  }

  // Apply date range filter if provided
  if (filters && (filters.dateFrom || filters.dateTo)) {
    options.createdAt = {
      $gt: new Date(filters.dateFrom || '1970-01-01'),
      $lt: filters.dateTo ? new Date(filters.dateTo) : new Date(),
    };
  }

  // Apply city filter
  if (status) {
    options.status = status;
  }

  

  // Build the sort object
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  // Create the query
  const query = this.designationModel.find(options).sort(sort);

  // Pagination
  if (page) {
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;
    const skipCount = (pageValue - 1) * limitValue;

    const items = await query.skip(skipCount).limit(limitValue).exec();
    const count = await this.designationRepository.count(options);

    return { items, count };
  }

  // Execute and return the query without pagination
  const items = await query.exec();
  return items;
}

async update(id: string, updateDto: UpdateDesignationDto ) {
  const designationData = await this.designationRepository.findOne({_id: id});
  if(!designationData) {
    throw new NotFoundException();
  }

  const designation = await this.designationRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!designation)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update designation details with reference updated designation

  // this.eventEmitter.emit('designation.updated', {});
  return {success: true};
}

// @OnEvent('designation.updated')
// async handledesignationUpdatedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(designation_CACHE_KEY);
// }

async delete(id: string) {
  const designation = await this.designationRepository.findOne({_id: id});
  if(!designation) throw new NotFoundException();

  const deleted = await this.designationRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}

// @OnEvent('designation.deleted')
// async handledesignationDeletedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(designation_CACHE_KEY);
// }
}
