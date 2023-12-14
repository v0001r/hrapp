import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { AuthGuard } from 'src/gaurds/auth.guard';
import { StaffExperienceService } from './staff-experience.service';
import { CreateStaffExperienceDto } from './dto/create-staff-experience.dto';
import { UpdateStaffExperienceDto } from './dto/update-staff-experience.dto';

@Controller('staff-experience')
export class StaffExperienceController {
  constructor(private readonly staffExperienceService: StaffExperienceService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateStaffExperienceDto,
    ) {
     const branch =  await this.staffExperienceService.create(createDto);
     if(branch)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.staffExperienceService.find(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.staffExperienceService.findOne(id);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateStaffExperienceDto,
    ) {
    return this.staffExperienceService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.staffExperienceService.delete(id);
  }
}
