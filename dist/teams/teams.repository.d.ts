import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { TeamDocument } from './entities/team.entity';
export declare class TeamRepository extends EntityRepository<TeamDocument> {
    private readonly teamModel;
    constructor(teamModel: Model<TeamDocument>);
    getById(_id: string): Promise<any>;
    getByName(name: string): Promise<any>;
    getByCode(code: string): Promise<any>;
}
