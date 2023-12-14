import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffDoucumentDocument } from './entities/staff-doucument.entity';
export declare class StaffDoucumentRepository extends EntityRepository<StaffDoucumentDocument> {
    private readonly staffDoucumentModel;
    constructor(staffDoucumentModel: Model<StaffDoucumentDocument>);
    getById(id: string): Promise<any>;
}
