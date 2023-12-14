import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { PermissionDocument } from './entities/permission.entity';
export declare class PermissionRepository extends EntityRepository<PermissionDocument> {
    private readonly permissionModel;
    constructor(permissionModel: Model<PermissionDocument>);
    getById(_id: string): Promise<any>;
    getByName(name: string): Promise<any>;
}
