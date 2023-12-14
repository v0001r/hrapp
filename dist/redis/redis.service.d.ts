import { Cache } from 'cache-manager';
export declare class RedisService {
    private cacheManager;
    constructor(cacheManager: Cache);
    get(key: string): Promise<unknown>;
    set(key: string, value: object, ttl: number): Promise<void>;
    del(key: any): Promise<void>;
    clear(cache_key: any): Promise<void>;
    reset(): Promise<void>;
}
