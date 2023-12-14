import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { FilesModule } from '../files/files.module';
import { RedisModule } from '../redis/redis.module';
import { DatabaseModule } from 'src/database/database.module';

import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamSchema } from './entities/team.entity';
import { TeamRepository } from './teams.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffSchema } from 'src/staff/entities/staff.entity';
import { ShiftSchema } from 'src/shifts/entities/shift.entity';

export const TenantModelProviders = [
  {
    provide: 'Team',
    useFactory: (connection: Connection) => connection.model('Team', TeamSchema),
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
  controllers: [TeamsController],
  providers: [TeamsService, TeamRepository, ...TenantModelProviders],
})
export class TeamsModule {}
