import { Connection } from 'mongoose';
export declare class DatabaseService {
    private readonly request;
    private tenantIdentifier;
    constructor(request: Request);
    getConnection(): Promise<Connection>;
    createConnection(): Promise<Connection>;
    private static getTenantFromRequest;
    private static isEmpty;
}
