"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityRepository = void 0;
class EntityRepository {
    constructor(entityModel) {
        this.entityModel = entityModel;
    }
    async findOne(entityFilter, projection) {
        return this.entityModel.findOne(entityFilter, { ...projection });
    }
    async find(entityFilter, projection, options) {
        return await this.entityModel.find(entityFilter, { ...projection }, options);
    }
    async count(entityFilter) {
        return this.entityModel.countDocuments(entityFilter);
    }
    async create(createEntityData) {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }
    async findOneAndUpdate(entityFilterQuery, entity) {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, entity, {
            new: true,
        });
    }
    async delete(entityFilterQuery) {
        return this.entityModel.deleteOne(entityFilterQuery);
    }
    async deleteMany(entityFilterQuery) {
        return this.entityModel.deleteMany(entityFilterQuery);
    }
    async aggregate(pipeline, options) {
        return this.entityModel.aggregate(pipeline, options);
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entity.repository.base.js.map