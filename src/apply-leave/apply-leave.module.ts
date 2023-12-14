import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApplyLeaveService } from './apply-leave.service';
import { ApplyLeaveController } from './apply-leave.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ApplyLeaveSchema } from './entities/apply-leave.entity';
import { ApplyLeaveRepository } from './apply-leave.repository';
import { StaffSchema } from 'src/staff/entities/staff.entity';


export const TenantModelProviders = [
  {
    provide: 'ApplyLeave',
    useFactory: (connection: Connection) => connection.model('ApplyLeave', ApplyLeaveSchema),
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
  controllers: [ApplyLeaveController],
  providers: [ApplyLeaveService,  ApplyLeaveRepository, ...TenantModelProviders],
})
export class ApplyLeaveModule {}
