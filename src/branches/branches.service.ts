import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { BRANCHES_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchRepository } from './branches.repository';

import { RedisService } from 'src/redis/redis.service';

import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchDocument } from './entities/branch.entity';
import { StaffDocument } from 'src/staff/entities/staff.entity';

@Injectable()
export class BranchesService {
  constructor(
    @Inject('Branch') private readonly branchModel: Model<BranchDocument>,
    @Inject('Staff') private readonly staffModel: Model<StaffDocument>,
    private readonly branchRepository: BranchRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${BRANCHES_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;
  const branch = await this.branchModel.find({_id: params._id}).populate('branch_head').exec();

  // const branch = await this.branchRepository.findOne(params, projection);
  if (!branch) throw new NotFoundException();
  // console.log('111', branch);
  // await this.redisService.set(CACHE_KEY, branch, 0);
  return branch;
}

async create(createDto: CreateBranchDto) {
  let branch;

  branch = await this.branchRepository.getByName(createDto.name);
  if (branch) {
    throw new ConflictException('Branch with given name already exists');
  }
  try {
     const branchCreated = await this.branchRepository.create({...createDto});

    if(!branchCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('branch.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

@OnEvent('branch.created')
async handlebranchsCreatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(BRANCHES_CACHE_KEY);
}

async find(params: any = {}) {
  const { s, filters, city, state, country, sortBy, sortDir, page, limit, status } = params;

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
  if (city) {
    options.city = city;
  }

  // Apply city filter
  if (status) {
    options.status = status;
  }

  // Apply state filter
  if (state) {
    options.state = state;
  }

  // Apply country filter
  if (country) {
    options.country = country;
  }

  // Build the sort object
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  // Create the query
  const query = this.branchModel.find(options).populate('branch_head').sort(sort);

  // Pagination
  if (page) {
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;
    const skipCount = (pageValue - 1) * limitValue;

    const items = await query.skip(skipCount).limit(limitValue).exec();
    const count = await this.branchRepository.count(options);

    return { items, count };
  }

  // Execute and return the query without pagination
  const items = await query.exec();
  return items;
}


async update(id: string, updateDto: UpdateBranchDto ) {
  const branchData = await this.branchRepository.findOne({_id: id});
  if(!branchData) {
    throw new NotFoundException();
  }

  const branch = await this.branchRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!branch)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update branch details with reference updated branch

  // this.eventEmitter.emit('branch.updated', {});
  return {success: true};
}

@OnEvent('branch.updated')
async handlebranchUpdatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(BRANCHES_CACHE_KEY);
}

async delete(id: string) {
  const branch = await this.branchRepository.findOne({_id: id});
  if(!branch) throw new NotFoundException();

  const deleted = await this.branchRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}

@OnEvent('branch.deleted')
async handlebranchDeletedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(BRANCHES_CACHE_KEY);
}

// async deleteMany(ids: string[]) {

//   await ids.forEach( async (id) => {
//     const channelPartner = await this.channelPartnerRepository.findOne({_id: id});
//     if(!channelPartner) throw new NotFoundException();
    
//     // await this.channelPartnersDetailsService.delete(channelPartner.detail);
//   });

//   await this.channelPartnerRepository.deleteMany({ _id: ids });

//   // this.eventEmitter.emit('channelPartner.deletedMany', {});
//   return {success: true};
// }

// @OnEvent('channelPartner.deletedMany')
// async handlechannelPartnerDeletedManyEvent({ payload }: { payload: any; }) {
//   await this.redisService.clear(BRANCHES_CACHE_KEY);
// }

}
