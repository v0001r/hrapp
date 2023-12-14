import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ShiftSchema } from './entities/shift.entity';
import { ShiftRepository } from './shift.repository';
import { ShiftassignSchema } from './entities/shift-assign.entity';
import { TeamSchema } from 'src/teams/entities/team.entity';
import { StaffSchema } from 'src/staff/entities/staff.entity';
import { ShiftassignRepository } from './shift-assign.repository';
import { BranchSchema } from 'src/branches/entities/branch.entity';



export const TenantModelProviders = [
  {
    provide: 'Shift',
    useFactory: (connection: Connection) => connection.model('Shift', ShiftSchema),
    inject: ['TENANT_CONNECTION'],
  },
  {
    provide: 'Shiftassign',
    useFactory: (connection: Connection) => connection.model('Shiftassign', ShiftassignSchema),
    inject: ['TENANT_CONNECTION'],
  },
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
  ],
  controllers: [ShiftsController],
  providers: [ShiftsService, ShiftRepository,ShiftassignRepository, ...TenantModelProviders],
})
export class ShiftsModule {}
