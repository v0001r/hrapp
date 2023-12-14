import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { StaffDoucumentsService } from './staff-doucuments.service';
import { StaffDoucumentsController } from './staff-doucuments.controller';
import { StaffDoucumentRepository } from './staff-documents.repository';
import { StaffDoucumentSchema } from './entities/staff-doucument.entity';
import { FilesModule } from 'src/files/files.module';

export const TenantModelProviders = [
  {
    provide: 'StaffDoucument',
    useFactory: (connection: Connection) => connection.model('StaffDoucument', StaffDoucumentSchema),
    inject: ['TENANT_CONNECTION'],
  },
];
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    DatabaseModule,
    FilesModule
  ],
  controllers: [StaffDoucumentsController],
  providers: [StaffDoucumentsService,StaffDoucumentRepository, ...TenantModelProviders],
})
export class StaffDoucumentsModule {}
