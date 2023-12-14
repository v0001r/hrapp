import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SHIFT_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftDocument } from './entities/shift.entity';
import { ShiftRepository } from './shift.repository';
import { ShiftassignDocument } from './entities/shift-assign.entity';
import { ShiftassignRepository } from './shift-assign.repository';

@Injectable()
export class ShiftsService {
  constructor(
    @Inject('Shift') private readonly shiftModel: Model<ShiftDocument>,
    @Inject('Staff') private readonly staffModel: Model<ShiftDocument>,
    @Inject('Shiftassign') private readonly shiftassignModel: Model<ShiftassignDocument>,
    private readonly shiftRepository: ShiftRepository,
    private readonly shiftassignRepository: ShiftassignRepository,
    private readonly eventEmitter: EventEmitter2,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${SHIFT_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;

  const leave = await this.shiftRepository.findOne(params, projection);
  if (!leave) throw new NotFoundException();
  // console.log('111', leave);
  // await this.redisService.set(CACHE_KEY, leave, 0);
  return leave;
}

async create(createDto: CreateShiftDto) {
  let team;

  team = await this.shiftRepository.getByName(createDto.name);
  if (team) {
    throw new ConflictException('Shift with given name already exists');
  }

  try {
     const leaveCreated = await this.shiftRepository.create({...createDto});

    if(!leaveCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('leave.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

// @OnEvent('leave.created')
// async handleleavesCreatedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(leave_CACHE_KEY);
// }

async find(params: any = {}) {
  const { s, from, to, sortBy, sortDir, page, limit, status } = params;

  const options: any = {};

  // Build the common search keywords with a $or operator
  if (s) {
    options.$or = [
      { name: new RegExp(s, 'i') },
      { code: new RegExp(s, 'i') },
    ];
  }

  // Apply time range filter if provided
  if (from && to) {
    options.from = {
      $gt: from,
    };
    options.to = {
      $lt: to,
    };
  }

  // Apply status filter
  if (status) {
    options.status = status;
  }



  // Build the sort object
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  // Create the query
  const query = this.shiftModel.find(options).sort(sort);

  // Pagination
  if (page) {
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;
    const skipCount = (pageValue - 1) * limitValue;

    const items = await query.skip(skipCount).limit(limitValue).exec();
    const count = await this.shiftRepository.count(options);

    return { items, count };
  }

  // Execute and return the query without pagination
  const items = await query.exec();
  return items;
}


async update(id: string, updateDto: UpdateShiftDto ) {
  const leaveData = await this.shiftRepository.findOne({_id: id});
  if(!leaveData) {
    throw new NotFoundException();
  }

  const leave = await this.shiftRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!leave)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update leave details with reference updated leave

  // this.eventEmitter.emit('leave.updated', {});
  return {success: true};
}

// @OnEvent('leave.updated')
// async handleleaveUpdatedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(leave_CACHE_KEY);
// }

async delete(id: string) {
  const leave = await this.shiftRepository.findOne({_id: id});
  if(!leave) throw new NotFoundException();

  const shift = await this.shiftassignModel.find({shift_id:id});

  if(shift)
  throw new ConflictException('Shift cant be deleted, it is alloted to employee or teams');

  const deleted = await this.shiftRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}

// @OnEvent('leave.deleted')
// async handleleaveDeletedEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(leave_CACHE_KEY);
// }

async deleteMany(ids: string[]) {

  await ids.forEach( async (id) => {
    const shifts = await this.shiftRepository.findOne({_id: id});
    if(!shifts) throw new NotFoundException();

    const shift = await this.shiftassignModel.find({shift_id:id});

    if(shift)
    throw new ConflictException('Shift cant be deleted, it is alloted to employee or teams');
      
  });

  await this.shiftRepository.deleteMany({ _id: ids });

  return {success: true};
}

async assign_shift(createDto){

  const emps = this.staffModel.find({team_id: createDto.team_id});

  (await emps).forEach(async (emp) => {
    const data = {
      "emp_id": emp._id,
      "team_id": createDto.team_id,
      "shift_id": createDto.shift_id,
      "start_date": createDto.start_date,
      "end_date": createDto.end_date
    }
    try {
      const shiftAssigned = await this.shiftassignRepository.create({...data});
  
     if(!shiftAssigned)
     throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);
  
     // this.eventEmitter.emit('leave.created', {});
     return {success: true};
  
     } catch (error) {
       console.log(error);
     }
  });
  
}


async get_shifts(params: any = {}) {
  let options: {
    $or?: any;
    createdAt?: any;
  } = {};


  // search by filters
  if(params.filters) {
    if(params.filters.dateFrom || params.filters.dateTo) {
      options.createdAt = {
        '$gt': new Date(params.filters.dateFrom || "1970-01-01"),
        '$lt': params.filters.dateTo ? new Date(params.filters.dateTo) : new Date()
      }
    }
  }

  let sort = {
    createdAt: "desc" as any
  };


  // generate query
  const query = this.shiftassignModel.find(options).sort(sort);

  return await query.exec();

}

}
