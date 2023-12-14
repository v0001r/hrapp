import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { StaffEducationService } from './staff-education.service';
import { StaffEducationController } from './staff-education.controller';
import { StaffEducationSchema } from './entities/staff-education.entity';
import { StaffEducationRepository } from './staff-education.repository';

export const TenantModelProviders = [
  {
    provide: 'StaffEducation',
    useFactory: (connection: Connection) => connection.model('StaffEducation', StaffEducationSchema),
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
  controllers: [StaffEducationController],
  providers: [StaffEducationService, StaffEducationRepository, ...TenantModelProviders],
})
export class StaffEducationModule {}
