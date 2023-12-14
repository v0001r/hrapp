import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ROLE_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from 'src/redis/redis.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDocument } from './entities/role.entity';
import { RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(
    @Inject('Role') private readonly roleModel: Model<RoleDocument>,
    private readonly roleRepository: RoleRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${ROLE_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;

  const role = await this.roleRepository.findOne(params, projection);
  if (!role) throw new NotFoundException();
  // console.log('111', channelPartner);
  // await this.redisService.set(CACHE_KEY, channelPartner, 0);
  return role;
}

async create(createDto: CreateRoleDto) {
  let role;

  role = await this.roleRepository.getByName(createDto.name);
  if (role) {
    throw new ConflictException('role with given name already exists');
  }
  try {
     const roleCreated = await this.roleRepository.create({...createDto});

    if(!roleCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('role.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

@OnEvent('role.created')
async handlerolesCreatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(ROLE_CACHE_KEY);
}

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
  const query = this.roleModel.find(options).sort(sort);

  // Pagination Starts
  if(params.page) {
    // get current page data
    const page: number = parseInt(params.page as any) || 1;
    const limit: number = parseInt(params.limit as any) || 10;
    const items = await query.skip((page - 1) * limit).limit(limit).exec();

    // get total count
    const count = await this.roleRepository.count(options);

    return {
      items,
      count
    }
  }
  // Pagination Ends

  return await query.exec();
}

async update(id: string, updateDto: UpdateRoleDto ) {
  const roleData = await this.roleRepository.findOne({_id: id});
  if(!roleData) {
    throw new NotFoundException();
  }

  const role = await this.roleRepository.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: updateDto },
  );
  if (!role)
    throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

  
  // TODO: update role details with reference updated role

  // this.eventEmitter.emit('role.updated', {});
  return {success: true};
}

@OnEvent('role.updated')
async handleroleUpdatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(ROLE_CACHE_KEY);
}

async delete(id: string) {
  const role = await this.roleRepository.findOne({_id: id});
  if(!role) throw new NotFoundException();

  const deleted = await this.roleRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}

@OnEvent('role.deleted')
async handleroleDeletedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(ROLE_CACHE_KEY);
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
//   await this.redisService.clear(ROLE_CACHE_KEY);
// }

}
