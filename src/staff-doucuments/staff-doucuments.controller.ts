import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';
import { AuthGuard } from 'src/gaurds/auth.guard';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';

import { StaffDoucumentsService } from './staff-doucuments.service';
import { CreateStaffDoucumentDto } from './dto/create-staff-doucument.dto';
import { UpdateStaffDoucumentDto } from './dto/update-staff-doucument.dto';

@Controller('staff-doucuments')
@Injectable({ scope: Scope.REQUEST })

export class StaffDoucumentsController {
  constructor(private readonly staffDoucumentsService: StaffDoucumentsService,  @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('document'))
  async create(
    @Body() createDto: CreateStaffDoucumentDto,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),  // 5 MB
      ],
    }),
  ) document: Express.Multer.File,
    ) {
     const staff =  await this.staffDoucumentsService.create(createDto, document);
     return {success:true}
    }

    @Get(':id')
  findOne(@Param('id') id : string) {
   
    return this.staffDoucumentsService.findOne(id);
    
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.staffDoucumentsService.delete(id);
  }
}
