import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                isGlobal: true,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                ttl: 60 * 3600 * 1000,
                max: 1000
            }),
        }),
    ],
    providers: [RedisService],
    exports: [
        RedisModule,
        RedisService
    ],
})
export class RedisModule {}
