import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule} from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { FilesModule } from './files/files.module';
import { RedisModule } from './redis/redis.module';
import { BranchesModule } from './branches/branches.module';
import { TeamsModule } from './teams/teams.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { StaffModule } from './staff/staff.module';
import { ApplyLeaveModule } from './apply-leave/apply-leave.module';
import { ShiftsModule } from './shifts/shifts.module';
import { DepartmentsModule } from './departments/departments.module';
import { DesignationsModule } from './designations/designations.module';
import { StaffExperienceModule } from './staff-experience/staff-experience.module';
import { StaffEducationModule } from './staff-education/staff-education.module';
import { StaffDoucumentsModule } from './staff-doucuments/staff-doucuments.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        MONGO_URI: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_BUCKET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    FilesModule,
    RedisModule,
    EventEmitterModule.forRoot(
      {
        maxListeners: 100
      }
    ),
    BranchesModule,
    TeamsModule,
    RolesModule,
    PermissionsModule,
    StaffModule,
    ApplyLeaveModule,
    ShiftsModule,
    DepartmentsModule,
    DesignationsModule,
    StaffExperienceModule,
    StaffEducationModule,
    StaffDoucumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
