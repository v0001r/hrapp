import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DEPARTMENT_CACHE_KEY } from 'src/cache-keys.constant';
import { DepartmentDocument } from './entities/department.entity';
import { DepartmentRepository } from './departments.repository';
import { StaffDocument } from 'src/staff/entities/staff.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject('Department') private readonly departmentModel: Model<DepartmentDocument>,
    @Inject('Staff') private readonly staffModel: Model<StaffDocument>,
    private readonly departmentRepository: DepartmentRepository,
    private readonly eventEmitter: EventEmitter2,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${DEPARTMENT_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;
  const department = await this.departmentModel.find({_id: params._id}).populate('parent_department').populate('department_head').exec();

  // const department = await this.departmentRepository.findOne(params, projection);
  if (!department) throw new NotFoundException();
  // console.log('111', department);
  // await this.redisService.set(CACHE_KEY, department, 0);
  return department;
}

async create(createDto: CreateDepartmentDto) {
  let department;

  department = await this.departmentRepository.getByName(createDto.name);
  if (department) {
    throw new ConflictException('department with given name already exists');
  }
  try {
     const departmentCreated = await this.departmentRepository.create({...createDto});

    if(!departmentCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('department.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

// @OnEvent('department.created')
// async handledepartmentsCreatedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(department_CACHE_KEY);
// }
async find(params: any = {}) {
  const { s, filters, department, sortBy, sortDir, page, limit, status } = params;

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

  // Apply state filter
  if (department) {
    options.parent_department = department;
  }

  // Build the sort object
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  // Create the query
  const query = this.departmentModel.find(options).populate('parent_department').populate('department_head').sort(sort);

  // Pagination
  if (page) {
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;
    const skipCount = (pageValue - 1) * limitValue;

    const items = await query.skip(skipCount).limit(limitValue).exec();
    const count = await this.departmentRepository.count(options);

    return { items, count };
  }

  // Execute and return the query without pagination
  const items = await query.exec();
  return items;
}

async update(id: string, updateDto: UpdateDepartmentDto ) {
  const departmentData = await this.departmentRepository.findOne({_id: id});
  if(!departmentData) {
    throw new NotFoundException();
  }

  const department = await this.departmentRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!department)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update department details with reference updated department

  // this.eventEmitter.emit('department.updated', {});
  return {success: true};
}

// @OnEvent('department.updated')
// async handledepartmentUpdatedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(department_CACHE_KEY);
// }

async delete(id: string) {
  const department = await this.departmentRepository.findOne({_id: id});
  if(!department) throw new NotFoundException();

  const deleted = await this.departmentRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}

// @OnEvent('department.deleted')
// async handledepartmentDeletedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(department_CACHE_KEY);
// }
}
