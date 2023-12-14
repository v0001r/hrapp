"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FilesService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let S3FilesService = class S3FilesService {
    constructor(configService) {
        this.configService = configService;
    }
    async upload(dataBuffer, filename, mimetype, path) {
        const s3 = new aws_sdk_1.S3();
        const newFilename = (path) ? `${path}/${(0, uuid_1.v4)()}-${filename}` : `${(0, uuid_1.v4)()}-${filename}`;
        const uploadResult = await s3.upload({
            Bucket: this.configService.get('AWS_S3_BUCKET'),
            Body: dataBuffer,
            Key: newFilename,
            ContentType: mimetype,
            ContentDisposition: "inline",
        })
            .promise();
        return {
            key: uploadResult.Key,
            url: uploadResult.Location
        };
    }
    async delete(fileKey) {
        const s3 = new aws_sdk_1.S3();
        await s3.deleteObject({
            Bucket: this.configService.get('AWS_S3_BUCKET'),
            Key: fileKey,
        }).promise();
    }
};
exports.S3FilesService = S3FilesService;
exports.S3FilesService = S3FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3FilesService);
//# sourceMappingURL=s3-files.service.js.map