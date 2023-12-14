import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Req, Query, Scope, Injectable, Inject, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import axios , { AxiosRequestConfig } from 'axios';

import ParamsWithId from '../common/params-with-id';
import MongooseClassSerializerInterceptor from 'src/common/mongoose-class-serializer.interceptor';

import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from 'src/gaurds/auth.guard';


@Controller('staff')
@Injectable({ scope: Scope.REQUEST })
export class StaffController {
  constructor(private readonly staffService: StaffService, @Inject(REQUEST) private readonly request: Request) {}

  
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createDto: CreateStaffDto,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),  // 5 MB
      ],
      fileIsRequired: false,
    }),
  ) image: Express.Multer.File,
    ) {
     const staff =  await this.staffService.create(createDto, image);

     if(staff){

      var password = " ";

    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
    password += charset.charAt(Math.floor(Math.random() * charset.length));


      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:5011/v1/auth/register',
        headers: {
          'content-type': 'application/json',
          'x-tenant': this.request.headers[`x-tenant`]?.toString()
        },
        data: {
          ref_id: staff.staff._id.toString(),
          name: createDto.first_name,
          email: createDto.email,
          mobile: createDto.phone,
          password: password,
          user_type: 'S',
          ip: createDto.ip,
          mac_id: createDto.mac_address
        }
      };
      await axios.request(options).then(function (response) {
        //  console.log(response);
        }).catch(function (error) {
          console.error(error);
        });
     }
     return {success:true}
    }

  @Get()
  findAll(@Req() req: Request) {
    return this.staffService.find(req.query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamsWithId) {
    const query = { _id: id };
    return this.staffService.findOne(query);
    
  }

  
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param() { id }: ParamsWithId, 
    @Body() updateDto: UpdateStaffDto,
    @UploadedFile( 
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),  // 5 MB
        ],
      }),
    ) image: Express.Multer.File,
    ) {
    return this.staffService.update(id, updateDto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.staffService.delete(id);
  }

  @Delete('')
  deleteMany(@Body('ids') ids: [string]) {
    return this.staffService.deleteMany(ids);
  }

  
  @Get('conflicted-employess')
  async conflicted(@Req() req: Request){

    return await this.staffService.conflicted(req.query);

  }
}
