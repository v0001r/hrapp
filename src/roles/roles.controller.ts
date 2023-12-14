import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/gaurds/auth.guard';

@Controller('roles')
@Injectable({ scope: Scope.REQUEST })
export class RolesController {
  constructor(private readonly rolesService: RolesService, @Inject(REQUEST) private readonly request: Request) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateRoleDto,
    ) {
      console.log(createDto.permissions);
     const branch =  await this.rolesService.create(createDto);
     if(branch)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.rolesService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.rolesService.findOne(query);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateRoleDto,
    ) {
    return this.rolesService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }

}
