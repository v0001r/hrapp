import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { FilesModule } from '../files/files.module';
import { RedisModule } from '../redis/redis.module';
import { DatabaseModule } from 'src/database/database.module';

import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { BranchSchema } from './entities/branch.entity';
import { BranchRepository } from './branches.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffSchema } from 'src/staff/entities/staff.entity';

export const TenantModelProviders = [
  {
    provide: 'Branch',
    useFactory: (connection: Connection) => connection.model('Branch', BranchSchema),
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
    RedisModule
  ],
  controllers: [BranchesController],
  providers: [BranchesService, BranchRepository, ...TenantModelProviders],
})
export class BranchesModule {}
