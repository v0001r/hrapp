import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { FilesModule } from '../files/files.module';
import { RedisModule } from '../redis/redis.module';
import { DatabaseModule } from 'src/database/database.module';

import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionSchema } from './entities/permission.entity';
import { PermissionRepository } from './permissions.repository';

export const TenantModelProviders = [
  {
    provide: 'Permission',
    useFactory: (connection: Connection) => connection.model('Permission', PermissionSchema),
    inject: ['TENANT_CONNECTION'],
  },
];

@Module({
  imports: [
    DatabaseModule,
    RedisModule
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository, ...TenantModelProviders],
})
export class PermissionsModule {}
