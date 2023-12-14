import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffDocument } from './entities/staff.entity';
export declare class StaffRepository extends EntityRepository<StaffDocument> {
    private readonly staffModel;
    constructor(staffModel: Model<StaffDocument>);
    getById(_id: string): Promise<any>;
    getByName(name: string): Promise<any>;
    getByEmail(email: string): Promise<any>;
    getByPhone(phone: string): Promise<any>;
}
