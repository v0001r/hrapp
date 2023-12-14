import { DatabaseService } from './database.service';
import { Scope } from '@nestjs/common';
export declare const mongooseProviders: {
    provide: string;
    scope: Scope;
    useFactory: (connection: DatabaseService) => Promise<unknown>;
    inject: (typeof DatabaseService)[];
}[];
export declare class DatabaseModule {
}
