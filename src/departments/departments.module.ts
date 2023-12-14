import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentSchema } from './entities/department.entity';
import { DepartmentRepository } from './departments.repository';
import { StaffSchema } from 'src/staff/entities/staff.entity';


export const TenantModelProviders = [
  {
    provide: 'Department',
    useFactory: (connection: Connection) => connection.model('Department', DepartmentSchema),
    inject: ['TENANT_CONNECTION'],
  },
  {
    provide: 'Staff',
    useFactory: (connection: Connection) => connection.model('Staff', StaffSchema),
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
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentRepository, ...TenantModelProviders],
})
export class DepartmentsModule {}
