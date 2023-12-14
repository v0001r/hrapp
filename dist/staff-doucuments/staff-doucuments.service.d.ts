import { Model } from 'mongoose';
import { CreateStaffDoucumentDto } from './dto/create-staff-doucument.dto';
import { StaffDoucumentDocument } from './entities/staff-doucument.entity';
import { StaffDoucumentRepository } from './staff-documents.repository';
import { S3FilesService } from 'src/files/s3-files.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class StaffDoucumentsService {
    private readonly staffModel;
    private readonly staffDoucumentRepository;
    private readonly s3FilesService;
    private readonly eventEmitter;
    constructor(staffModel: Model<StaffDoucumentDocument>, staffDoucumentRepository: StaffDoucumentRepository, s3FilesService: S3FilesService, eventEmitter: EventEmitter2);
    findOne(id: any): Promise<any>;
    create(createDto: CreateStaffDoucumentDto, file: any): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
