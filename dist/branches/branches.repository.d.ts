import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { BranchDocument } from './entities/branch.entity';
export declare class BranchRepository extends EntityRepository<BranchDocument> {
    private readonly branchModel;
    constructor(branchModel: Model<BranchDocument>);
    getById(_id: string): Promise<any>;
    getByName(name: string): Promise<any>;
}
