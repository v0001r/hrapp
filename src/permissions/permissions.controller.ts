import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';

import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
@Injectable({ scope: Scope.REQUEST })
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService,  @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  async create(
    @Body() createDto: CreatePermissionDto,
    ) {
     const permission =  await this.permissionsService.create(createDto);
     if(permission)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.permissionsService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.permissionsService.findOne(query);
    
  }
  
}
