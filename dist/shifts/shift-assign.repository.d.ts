import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { ShiftassignDocument } from './entities/shift-assign.entity';
export declare class ShiftassignRepository extends EntityRepository<ShiftassignDocument> {
    private readonly shiftassignModel;
    constructor(shiftassignModel: Model<ShiftassignDocument>);
}
