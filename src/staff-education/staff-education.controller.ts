import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { AuthGuard } from 'src/gaurds/auth.guard';

import { StaffEducationService } from './staff-education.service';
import { CreateStaffEducationDto } from './dto/create-staff-education.dto';
import { UpdateStaffEducationDto } from './dto/update-staff-education.dto';

@Controller('staff-education')
export class StaffEducationController {
  constructor(private readonly staffEducationService: StaffEducationService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateStaffEducationDto,
    ) {
     const branch =  await this.staffEducationService.create(createDto);
     if(branch)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.staffEducationService.find(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id : string) {
   
    return this.staffEducationService.findOne(id);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateStaffEducationDto,
    ) {
    return this.staffEducationService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.staffEducationService.delete(id);
  }
}
