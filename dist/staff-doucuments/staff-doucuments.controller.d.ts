/// <reference types="multer" />
import { Request } from 'express';
import { StaffDoucumentsService } from './staff-doucuments.service';
import { CreateStaffDoucumentDto } from './dto/create-staff-doucument.dto';
export declare class StaffDoucumentsController {
    private readonly staffDoucumentsService;
    private readonly request;
    constructor(staffDoucumentsService: StaffDoucumentsService, request: Request);
    create(createDto: CreateStaffDoucumentDto, document: Express.Multer.File): Promise<{
        success: boolean;
    }>;
    findOne(id: string): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
