import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { RoleDocument } from './entities/role.entity';
export declare class RoleRepository extends EntityRepository<RoleDocument> {
    private readonly roleModel;
    constructor(roleModel: Model<RoleDocument>);
    getById(_id: string): Promise<any>;
    getByName(name: string): Promise<any>;
}
