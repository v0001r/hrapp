import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffExperienceService } from './staff-experience.service';
import { StaffExperienceController } from './staff-experience.controller';
import { StaffExperienceSchema } from './entities/staff-experience.entity';
import { StaffExperienceRepository } from './staff-experience.repository';


export const TenantModelProviders = [
  {
    provide: 'StaffExperience',
    useFactory: (connection: Connection) => connection.model('StaffExperience', StaffExperienceSchema),
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
  controllers: [StaffExperienceController],
  providers: [StaffExperienceService,StaffExperienceRepository,...TenantModelProviders],
})
export class StaffExperienceModule {}
