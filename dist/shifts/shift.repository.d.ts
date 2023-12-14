import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { ShiftDocument } from './entities/shift.entity';
export declare class ShiftRepository extends EntityRepository<ShiftDocument> {
    private readonly shiftModel;
    constructor(shiftModel: Model<ShiftDocument>);
    getByName(name: string): Promise<any>;
}
