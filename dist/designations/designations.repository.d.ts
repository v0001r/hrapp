import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { DesignationDocument } from './entities/designation.entity';
export declare class DesignationRepository extends EntityRepository<DesignationDocument> {
    private readonly designationModel;
    constructor(designationModel: Model<DesignationDocument>);
    getByName(name: string): Promise<any>;
}
