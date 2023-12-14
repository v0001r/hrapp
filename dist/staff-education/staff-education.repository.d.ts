import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffEducationDocument } from './entities/staff-education.entity';
export declare class StaffEducationRepository extends EntityRepository<StaffEducationDocument> {
    private readonly staffEducationModel;
    constructor(staffEducationModel: Model<StaffEducationDocument>);
    getById(id: string): Promise<any>;
}
