import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { AuthGuard } from 'src/gaurds/auth.guard';

import { DesignationsService } from './designations.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Controller('designations')
export class DesignationsController {
  constructor(private readonly designationsService: DesignationsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateDesignationDto,
    ) {
     const designation =  await this.designationsService.create(createDto);
     if(designation)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.designationsService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.designationsService.findOne(query);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)

  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateDesignationDto,
    ) {
    return this.designationsService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.designationsService.delete(id);
  }
}
