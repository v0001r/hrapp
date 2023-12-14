import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { DepartmentDocument } from './entities/department.entity';
export declare class DepartmentRepository extends EntityRepository<DepartmentDocument> {
    private readonly departmentModel;
    constructor(departmentModel: Model<DepartmentDocument>);
    getById(_id: string): Promise<any>;
    getByName(name: string): Promise<any>;
}
