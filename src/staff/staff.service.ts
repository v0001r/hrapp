import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { STAFF_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { S3FilesService } from 'src/files/s3-files.service';
import { RedisService } from 'src/redis/redis.service';

import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDocument } from './entities/staff.entity';
import { StaffRepository } from './staff.repository';
import { BranchDocument } from 'src/branches/entities/branch.entity';
import { TeamDocument } from 'src/teams/entities/team.entity';
import { RoleDocument } from 'src/roles/entities/role.entity';
import { DepartmentDocument } from 'src/departments/entities/department.entity';
import { DesignationDocument } from 'src/designations/entities/designation.entity';

@Injectable()
export class StaffService {
  constructor(
    @Inject('Staff') private readonly staffModel: Model<StaffDocument>,
    @Inject('Branch') private readonly branchModel: Model<BranchDocument>,
    @Inject('Team') private readonly teamModel: Model<TeamDocument>,
    @Inject('Role') private readonly roleModel: Model<RoleDocument>,
    @Inject('Department') private readonly departmentModel: Model<DepartmentDocument>,
    @Inject('Designation') private readonly designationModel: Model<DesignationDocument>,

    private readonly staffRepository: StaffRepository,
    private readonly s3FilesService: S3FilesService,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
) {}

async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${STAFF_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;

  const staff = await this.staffRepository.findOne(params, projection);
  if (!staff) throw new NotFoundException();
  // console.log('111', staff);
  // await this.redisService.set(CACHE_KEY, staff, 0);
  return staff;
}

async create(createDto: CreateStaffDto, file:any) {
  let staff;

  // check if staff email exist
  staff = await this.staffRepository.getByEmail(createDto.email);
  if (staff) {
    throw new ConflictException('Staff with given email already exists');
  }

  // check if staff phone exist
  staff = await this.staffRepository.getByPhone(createDto.phone);
  if (staff) {
    throw new ConflictException('Staff with given phone already exists');
  }

  if(file)
  var image = await this.s3FilesService.upload(file.buffer, file.originalname, file.mimetype);

  try {
 
    // TODO: create staff details with reference created staff
    if(image){
      var staffCreated = await this.staffRepository.create({
        ...createDto,
        image,
      });
    }else{
      var staffCreated = await this.staffRepository.create({
        ...createDto,
      });
    }
    if(!staffCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('staff.created', {});
    return {success: true, staff: staffCreated};

    } catch (error) {
      console.log(error);
    }
}

@OnEvent('staff.created')
async handlestaffsCreatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(STAFF_CACHE_KEY);
}

async find(params: any = {}) {
  const { s, filters, city, state, country, sortBy, sortDir, page, limit, branch_id, team_id, reporting_to,shift_id, department_id, role, status, designation } = params;

  const options: any = {};

  // Build the common search keywords with a $or operator
  if (s) {
    options.$or = [
      { first_name: new RegExp(s, 'i') },
      { middle_name: new RegExp(s, 'i') },
      { first_name: new RegExp(s, 'i') },
      { last_name: new RegExp(s, 'i') },
      { email: new RegExp(s, 'i') },
      { phone: new RegExp(s, 'i') },
    ];
  }

  // Apply date range filter if provided
  if (filters && (filters.dateFrom || filters.dateTo)) {
    options.createdAt = {
      $gt: new Date(filters.dateFrom || '1970-01-01'),
      $lt: filters.dateTo ? new Date(filters.dateTo) : new Date()
    };
  }

  // Apply city filter
  if (city) {
    options.city = city;
  }

  // Apply state filter
  if (state) {
    options.state = state;
  }

  // Apply country filter
  if (country) {
    options.country = country;
  }

  // Apply country filter
  if (branch_id) {
    options.branch_id = branch_id;
  }

  // Apply team filter
  if (team_id) {
    options.team_id = team_id;
  }
  if (department_id) {
    options.department_id = department_id;
  }
  if (shift_id) {
    options.shift_id = shift_id;
  }
  if (designation) {
    options.designation = designation;
  }

  // Apply reporting filter
  if (reporting_to) {
    options.reporting_to = reporting_to;
  }

  // Apply role filter
  if (role) {
    options.role = role;
  }

  // Apply country filter
  if (status) {
    options.status = status;
  }

  // Build the sort object
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  // Create the query
  const query = this.staffModel.find(options).populate('team_id', '_id name code').populate('designation', '_id name code').populate('branch_id', '_id name code').populate('role', '_id name').populate('primary_reporting', '_id salutation first_name middle_name last_name email phone').populate('secondary_reporting', '_id salutation first_name middle_name last_name email phone').populate('department_id').sort(sort);

  // Pagination
  if (page) {
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;
    const skipCount = (pageValue - 1) * limitValue;

    const items = await query.skip(skipCount).limit(limitValue).exec();
    const count = await this.staffModel.countDocuments(options);

    return { items, count };
  }

  // Execute and return the query without pagination
  const items = await query.exec();
  return items;
}


async update(id: string, updateDto: UpdateStaffDto, file:any ) {
  const staffData = await this.staffRepository.findOne({_id: id});
  if(!staffData) {
    throw new NotFoundException();
  }

  if(file) {
    // first delete old image
    if(staffData.image)
      await this.s3FilesService.delete(staffData.image.key);
    // Upload thumbnail to S3
    staffData.image = await this.s3FilesService.upload(file.buffer, file.originalname, file.mimetype);
  }


  const staff = await this.staffRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!staff)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update staff details with reference updated staff

  // this.eventEmitter.emit('staff.updated', {});
  return {success: true};
}

@OnEvent('staff.updated')
async handlestaffUpdatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(STAFF_CACHE_KEY);
}

async delete(id: string) {
  const staff = await this.staffRepository.findOne({_id: id});
  if(!staff) throw new NotFoundException();

  const deleted = await this.staffRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);

  //  await this.staffsDetailsService.delete(staff.detail);

  // this.eventEmitter.emit('staff.deleted', {});
  return {success: true};
}

@OnEvent('staff.deleted')
async handlestaffDeletedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(STAFF_CACHE_KEY);
}

async deleteMany(ids: string[]) {

  await ids.forEach( async (id) => {
    const staff = await this.staffRepository.findOne({_id: id});
    if(!staff) throw new NotFoundException();
    
    // await this.staffsDetailsService.delete(staff.detail);
  });

  await this.staffRepository.deleteMany({ _id: ids });

  // this.eventEmitter.emit('staff.deletedMany', {});
  return {success: true};
}

@OnEvent('staff.deletedMany')
async handlestaffDeletedManyEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(STAFF_CACHE_KEY);
}
async conflicted(params: any = {}){

}
}
