import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PERMISSIONS_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionRepository } from './permissions.repository';

import { RedisService } from 'src/redis/redis.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionDocument } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject('Permission') private readonly permissionModel: Model<PermissionDocument>,
    private readonly permissionRepository: PermissionRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
) {}
  
async findOne(
  params: Record<string, unknown> = {},
  projection?: Record<string, unknown>,
) {
  // generate cache key name
  const CACHE_KEY = `${PERMISSIONS_CACHE_KEY}_${params._id.toString()}`;

  // check if data is in cache:
  // const cachedData = await this.redisService.get(CACHE_KEY);
  // if (cachedData) return cachedData;

  const permission = await this.permissionRepository.findOne(params, projection);
  if (!permission) throw new NotFoundException();
  // console.log('111', permission);
  // await this.redisService.set(CACHE_KEY, permission, 0);
  return permission;
}

async create(createDto: UpdatePermissionDto) {
  let permission;

  permission = await this.permissionRepository.getByName(createDto.name);
  if (permission) {
    throw new ConflictException('permission with given name already exists');
  }
  try {
     const permisionCreated = await this.permissionRepository.create({...createDto});

    if(!permisionCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('permision.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

@OnEvent('permision.created')
async handlepermisionsCreatedEvent({ payload }: { payload: any; }) {
  await this.redisService.clear(PERMISSIONS_CACHE_KEY);
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
  const query = this.permissionModel.find(options).sort(sort);

  // Pagination Starts
  if(params.page) {
    // get current page data
    const page: number = parseInt(params.page as any) || 1;
    const limit: number = parseInt(params.limit as any) || 10;
    const items = await query.skip((page - 1) * limit).limit(limit).exec();

    // get total count
    const count = await this.permissionRepository.count(options);

    return {
      items,
      count
    }
  }
  // Pagination Ends

  return await query.exec();
}
}
