import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { AuthGuard } from 'src/gaurds/auth.guard';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateDepartmentDto,
    ) {
     const branch =  await this.departmentsService.create(createDto);
     if(branch)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.departmentsService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.departmentsService.findOne(query);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)

  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateDepartmentDto,
    ) {
    return this.departmentsService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.departmentsService.delete(id);
  }
}
