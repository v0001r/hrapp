import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { StaffExperienceDocument } from './entities/staff-experience.entity';
export declare class StaffExperienceRepository extends EntityRepository<StaffExperienceDocument> {
    private readonly staffExperienceModel;
    constructor(staffExperienceModel: Model<StaffExperienceDocument>);
    getById(id: string): Promise<any>;
}
