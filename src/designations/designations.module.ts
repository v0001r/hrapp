import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DesignationsService } from './designations.service';
import { DesignationsController } from './designations.controller';
import { DesignationSchema } from './entities/designation.entity';
import { DesignationRepository } from './designations.repository';


export const TenantModelProviders = [
  {
    provide: 'Designation',
    useFactory: (connection: Connection) => connection.model('Designation', DesignationSchema),
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
  ],
  controllers: [DesignationsController],
  providers: [DesignationsService, DesignationRepository, ...TenantModelProviders],
})
export class DesignationsModule {}
