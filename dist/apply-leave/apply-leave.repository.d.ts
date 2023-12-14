import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { ApplyLeaveDocument } from './entities/apply-leave.entity';
export declare class ApplyLeaveRepository extends EntityRepository<ApplyLeaveDocument> {
    private readonly ApplyLeaveModel;
    constructor(ApplyLeaveModel: Model<ApplyLeaveDocument>);
    getByUser(id: any): Promise<any>;
}
