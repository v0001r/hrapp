import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';
import { AuthGuard } from 'src/gaurds/auth.guard';


import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateShiftDto,
    ) {
     const branch =  await this.shiftsService.create(createDto);
     if(branch)
     return {success:true}
     }
    

  @Get()
  findAll(@Req() req: Request) {
    return this.shiftsService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.shiftsService.findOne(query);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateShiftDto,
    ) {
    return this.shiftsService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.shiftsService.delete(id);
  }


  @Delete('')
  deleteMany(@Body('ids') ids: [string]) {
    return this.shiftsService.deleteMany(ids);
  }

  @Post('assign-shift')
  @UseGuards(AuthGuard)
  async assign_shift(@Body() body){

    return await this.shiftsService.assign_shift(body);

  }

  @Get('get-shifts')
  @UseGuards(AuthGuard)
  async conflicted(@Req() req: Request){

    return await this.shiftsService.get_shifts(req.query);

  }

}
