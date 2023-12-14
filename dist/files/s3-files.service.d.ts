/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class S3FilesService {
    private readonly configService;
    constructor(configService: ConfigService);
    upload(dataBuffer: Buffer, filename: string, mimetype: string, path?: string): Promise<{
        key: string;
        url: string;
    }>;
    delete(fileKey: string): Promise<void>;
}
