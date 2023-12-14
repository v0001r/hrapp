import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public async get(key: string) {
        return await this.cacheManager.get(key);
    }

    public async set(key: string, value: object, ttl: number) {
        await this.cacheManager.set(key, value, ttl);
    }

    public async del(key: any) {
        await this.cacheManager.del(key);
    }

    public async clear(cache_key: any) {
        const keys: string[] = await this.cacheManager.store.keys();
        keys.forEach(key => {
            if (key.startsWith(cache_key)) {
                this.cacheManager.del(key);
            }
        });
    }
    
    public async reset() {
        await this.cacheManager.reset();
    }
}
