import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';
import { AuthGuard } from 'src/gaurds/auth.guard';


import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { ApplyLeaveService } from './apply-leave.service';
import { CreateApplyLeaveDto } from './dto/create-apply-leave.dto';
import { UpdateApplyLeaveDto } from './dto/update-apply-leave.dto';

@Controller('apply-leave')
export class ApplyLeaveController {
  constructor(private readonly applyLeaveService: ApplyLeaveService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateApplyLeaveDto,
    ) {
     return this.applyLeaveService.create(createDto);
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.applyLeaveService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.applyLeaveService.findOne(query);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateApplyLeaveDto,
    ) {
    return this.applyLeaveService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.applyLeaveService.delete(id);
  }
}
