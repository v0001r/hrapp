import { AggregateOptions, Document, FilterQuery, Model, PipelineStage, UpdateQuery } from 'mongoose';
export declare abstract class EntityRepository<T extends Document> {
    protected readonly entityModel: Model<T>;
    constructor(entityModel: Model<T>);
    findOne(entityFilter: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T>;
    find(entityFilter: FilterQuery<T>, projection?: Record<string, unknown>, options?: Record<string, unknown>): Promise<T[]>;
    count(entityFilter: any): Promise<number>;
    create(createEntityData: Partial<T>): Promise<T>;
    findOneAndUpdate(entityFilterQuery: FilterQuery<T>, entity: UpdateQuery<T>): Promise<T>;
    delete(entityFilterQuery: FilterQuery<T>): Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
    deleteMany(entityFilterQuery: FilterQuery<T>): Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
    aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<T[]>;
}
