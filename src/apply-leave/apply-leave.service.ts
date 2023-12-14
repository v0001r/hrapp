import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { APPLY_LEAVE_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApplyLeaveDto } from './dto/create-apply-leave.dto';
import { UpdateApplyLeaveDto } from './dto/update-apply-leave.dto';
import { ApplyLeaveRepository } from './apply-leave.repository';
import { ApplyLeaveDocument } from './entities/apply-leave.entity';
import { StaffDocument } from 'src/staff/entities/staff.entity';

@Injectable()
export class ApplyLeaveService {
  constructor(
    @Inject('ApplyLeave') private readonly applyLeaveModel: Model<ApplyLeaveDocument>,
    @Inject('Staff') private readonly staffModel: Model<StaffDocument>,
    private readonly applyLeaveRepository: ApplyLeaveRepository,
    private readonly eventEmitter: EventEmitter2,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${APPLY_LEAVE_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;

  const leave = await this.applyLeaveRepository.findOne(params, projection);
  if (!leave) throw new NotFoundException();
  // console.log('111', leave);
  // await this.redisService.set(CACHE_KEY, leave, 0);
  return leave;
}

async create(createDto: CreateApplyLeaveDto) {


  try {
     const leaveCreated = await this.applyLeaveRepository.create({...createDto});

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
  let options: {
    $or?: any;
    createdAt?: any;
  } = {};

  // common search keywords
  if(params.s) {
    options.$or = [
      {name: new RegExp(params.s.toString(), 'i')},
      {code: new RegExp(params.s.toString(), 'i')},
    ]
  }

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
  if(params.sortBy) {
    sort[params.sortBy] = params.sortDir || 'asc';
  }

  // generate query
  const query = this.applyLeaveModel.find(options).populate('employee').sort(sort);

  // Pagination Starts
  if(params.page) {
    // get current page data
    const page: number = parseInt(params.page as any) || 1;
    const limit: number = parseInt(params.limit as any) || 10;
    const items = await query.skip((page - 1) * limit).limit(limit).exec();

    // get total count
    const count = await this.applyLeaveRepository.count(options);

    return {
      items,
      count
    }
  }
  // Pagination Ends

  return await query.exec();
}

async update(id: string, updateDto: UpdateApplyLeaveDto ) {
  const leaveData = await this.applyLeaveRepository.findOne({_id: id});
  if(!leaveData) {
    throw new NotFoundException();
  }

  const leave = await this.applyLeaveRepository.findOneAndUpdate(
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
  const leave = await this.applyLeaveRepository.findOne({_id: id});
  if(!leave) throw new NotFoundException();

  const deleted = await this.applyLeaveRepository.delete({
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
}
