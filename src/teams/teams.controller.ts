import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';
import { AuthGuard } from 'src/gaurds/auth.guard';

import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';


@Controller('teams')
@Injectable({ scope: Scope.REQUEST })
export class TeamsController {
  constructor(private readonly teamsService: TeamsService, @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createDto: CreateTeamDto,
    ) {
     const branch =  await this.teamsService.create(createDto);
     if(branch)
     return {success:true}
     }
    
  @Get()
  findAll(@Req() req: Request) {
    return this.teamsService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.teamsService.findOne(query);
    
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateTeamDto,
    ) {
    return this.teamsService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamsService.delete(id);
  }
}
