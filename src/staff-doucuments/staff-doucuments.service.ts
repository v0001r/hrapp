import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { STAFF_CACHE_KEY } from 'src/cache-keys.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateStaffDoucumentDto } from './dto/create-staff-doucument.dto';
import { UpdateStaffDoucumentDto } from './dto/update-staff-doucument.dto';
import { StaffDoucumentDocument } from './entities/staff-doucument.entity';
import { StaffDoucumentRepository } from './staff-documents.repository';
import { S3FilesService } from 'src/files/s3-files.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class StaffDoucumentsService {
  constructor(
    @Inject('StaffDoucument') private readonly staffModel: Model<StaffDoucumentDocument>,

    private readonly staffDoucumentRepository: StaffDoucumentRepository,
    private readonly s3FilesService: S3FilesService,
    private readonly eventEmitter: EventEmitter2
) {}

async findOne(
  id
 ) {
 ;
 
   const exp = await this.staffDoucumentRepository.getById(id);
   if (!exp) throw new NotFoundException();
 
   return exp;
 }
 
async create(createDto: CreateStaffDoucumentDto, file:any) {


  if(file)
  var document = await this.s3FilesService.upload(file.buffer, file.originalname, file.mimetype);

  try {
 
    // TODO: create staff details with reference created staff
    if(document){
      var docCreated = await this.staffDoucumentRepository.create({
        ...createDto,
        document,
      });
    }else{
      var docCreated = await this.staffDoucumentRepository.create({
        ...createDto,
      });
    }
    if(!docCreated)
    throw new HttpException('Error occured while creating.', HttpStatus.INTERNAL_SERVER_ERROR);

    // this.eventEmitter.emit('staff.created', {});
    return {success: true};

    } catch (error) {
      console.log(error);
    }
}

async delete(id: string) {
  const exp = await this.staffDoucumentRepository.findOne({_id: id});
  if(!exp) throw new NotFoundException();

  const deleted = await this.staffDoucumentRepository.delete({
    _id: id,
  });
  if (!deleted)
    throw new HttpException('Error occured while deleting.', HttpStatus.INTERNAL_SERVER_ERROR);
  return {success: true};
}
}
