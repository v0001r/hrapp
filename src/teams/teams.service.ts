import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TEAM_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from 'src/redis/redis.service';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamDocument } from './entities/team.entity';
import { TeamRepository } from './teams.repository';
import { StaffDocument } from 'src/staff/entities/staff.entity';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('Team') private readonly teamModel: Model<TeamDocument>,
    @Inject('Staff') private readonly staffModel: Model<StaffDocument>,
    private readonly teamRepository: TeamRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${TEAM_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;
  const team = this.teamModel.find({_id:params._id}).populate('lead').exec();

  // const team = await this.teamRepository.findOne(params, projection);
  if (!team) throw new NotFoundException();
  // console.log('111', team);
  // await this.redisService.set(CACHE_KEY, team, 0);
  return team;
}

async create(createDto: CreateTeamDto) {
  let team;

  team = await this.teamRepository.getByName(createDto.name);
  if (team) {
    throw new ConflictException('team with given name already exists');
  }

  team = await this.teamRepository.getByCode(createDto.code);
  if (team) {
    throw new ConflictException('team with given code already exists');
  }
  try {
     const teamCreated = await this.teamRepository.create({...createDto});

    if(!teamCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('team.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

@OnEvent('team.created')
async handleteamsCreatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(TEAM_CACHE_KEY);
}

async find(params: any = {}) {
  const { s, filters, lead, sortBy, sortDir, page, limit, status } = params;

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

// return lead.length;
// return lead.length;
  // Apply multiple leads filter
  // if (lead && Array.isArray(lead) && lead.length > 0) {
  //     options.lead = { $in: lead };
  // }
  if (lead) {
      options.lead = lead;
  }
  

  // Build the sort object
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  // Create the query
  const query = this.teamModel.find(options).populate('lead').sort(sort);

  // Pagination
  if (page) {
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;
    const skipCount = (pageValue - 1) * limitValue;

    const items = await query.skip(skipCount).limit(limitValue).exec();
    const count = await this.teamRepository.count(options);

    return { items, count };
  }

  // Execute and return the query without pagination
  const items = await query.exec();
  return items;
}

// async find(params: any = {}) {
//   let options: {
//     $or?: any;
//     createdAt?: any;
//   } = {};

//   // common search keywords
//   if(params.s) {
//     options.$or = [
//       {name: new RegExp(params.s.toString(), 'i')},
//       {code: new RegExp(params.s.toString(), 'i')},
//     ]
//   }

//   // search by filters
//   if(params.filters) {
//     if(params.filters.dateFrom || params.filters.dateTo) {
//       options.createdAt = {
//         '$gt': new Date(params.filters.dateFrom || "1970-01-01"),
//         '$lt': params.filters.dateTo ? new Date(params.filters.dateTo) : new Date()
//       }
//     }
//   }

//   let sort = {
//     createdAt: "desc" as any
//   };
//   if(params.sortBy) {
//     sort[params.sortBy] = params.sortDir || 'asc';
//   }

//   // generate query
//   const query = this.teamModel.find(options).populate('lead').sort(sort);

//   // Pagination Starts
//   if(params.page) {
//     // get current page data
//     const page: number = parseInt(params.page as any) || 1;
//     const limit: number = parseInt(params.limit as any) || 10;
//     const items = await query.skip((page - 1) * limit).limit(limit).exec();

//     // get total count
//     const count = await this.teamRepository.count(options);

//     return {
//       items,
//       count
//     }
//   }
//   // Pagination Ends

//   return await query.exec();
// }

async update(id: string, updateDto: UpdateTeamDto ) {
  const teamData = await this.teamRepository.findOne({_id: id});
  if(!teamData) {
    throw new NotFoundException();
  }

  const team = await this.teamRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!team)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update team details with reference updated team

  // this.eventEmitter.emit('team.updated', {});
  return {success: true};
}

@OnEvent('team.updated')
async handleteamUpdatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(TEAM_CACHE_KEY);
}

async delete(id: string) {
  const team = await this.teamRepository.findOne({_id: id});
  if(!team) throw new NotFoundException();

  const deleted = await this.teamRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}

@OnEvent('team.deleted')
async handleteamDeletedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(TEAM_CACHE_KEY);
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
//   await this.redisService.clear(TEAM_CACHE_KEY);
// }

}
