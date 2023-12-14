import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';

import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { AuthGuard } from 'src/gaurds/auth.guard';

@Controller('branches')
@UseGuards(AuthGuard)
@Injectable({ scope: Scope.REQUEST })
export class BranchesController {
  constructor(private readonly branchesService: BranchesService, @Inject(REQUEST) private readonly request: Request) {}

  @Get('apiCheck')
  apiCkeck() {
    return {all: 'ok'};
  }

  @Post()
  async create(
    @Body() createDto: CreateBranchDto,
    ) {
     const branch =  await this.branchesService.create(createDto);
     if(branch)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.branchesService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.branchesService.findOne(query);
    
  }
  
  @Patch(':id')
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateBranchDto,
    ) {
    return this.branchesService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.branchesService.delete(id);
  }

}
