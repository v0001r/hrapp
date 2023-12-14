import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { FilesModule } from '../files/files.module';
import { RedisModule } from '../redis/redis.module';
import { DatabaseModule } from 'src/database/database.module';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleSchema } from './entities/role.entity';
import { RoleRepository } from './roles.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TenantModelProviders = [
  {
    provide: 'Role',
    useFactory: (connection: Connection) => connection.model('Role', RoleSchema),
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
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, ...TenantModelProviders],
})
export class RolesModule {}
