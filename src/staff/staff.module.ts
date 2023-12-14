import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { FilesModule } from '../files/files.module';
import { RedisModule } from '../redis/redis.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffSchema } from './entities/staff.entity';
import { StaffRepository } from './staff.repository';
import { TeamSchema } from 'src/teams/entities/team.entity';
import { BranchSchema } from 'src/branches/entities/branch.entity';
import { RoleSchema } from 'src/roles/entities/role.entity';
import { DepartmentSchema } from 'src/departments/entities/department.entity';
import { ShiftSchema } from 'src/shifts/entities/shift.entity';
import { DesignationSchema } from 'src/designations/entities/designation.entity';


export const TenantModelProviders = [
  {
    provide: 'Staff',
    useFactory: (connection: Connection) => connection.model('Staff', StaffSchema),
    inject: ['TENANT_CONNECTION'],
  },
  {
    provide: 'Team',
    useFactory: (connection: Connection) => connection.model('Team', TeamSchema),
    inject: ['TENANT_CONNECTION'],
  },
  {
    provide: 'Branch',
    useFactory: (connection: Connection) => connection.model('Branch', BranchSchema),
    inject: ['TENANT_CONNECTION'],
  },
  {
    provide: 'Role',
    useFactory: (connection: Connection) => connection.model('Role', RoleSchema),
    inject: ['TENANT_CONNECTION'],
  },
  {
    provide: 'Department',
    useFactory: (connection: Connection) => connection.model('Department', DepartmentSchema),
    inject: ['TENANT_CONNECTION'],
  },
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
    RedisModule,
    FilesModule
  ],
  controllers: [StaffController],
  providers: [StaffService, StaffRepository, ...TenantModelProviders],
})
export class StaffModule {
 
}
