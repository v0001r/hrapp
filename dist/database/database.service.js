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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
let DatabaseService = class DatabaseService {
    constructor(request) {
        this.request = request;
        this.tenantIdentifier = 'x-tenant';
    }
    async getConnection() {
        var _a, _b;
        const tenant = (_b = (_a = this.request.headers[`${this.tenantIdentifier}`]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.toString();
        if (!tenant) {
            throw new common_1.BadRequestException(`${this.tenantIdentifier} is not supplied in request header`);
        }
        const tenants = ['a1space', 'a1miraki'];
        if (!tenants.includes(`${tenant}`)) {
            throw new common_1.BadRequestException(`${tenant} is not exist`);
        }
        const connection = mongoose.connections;
        const minu = new Date().getMinutes();
        const hr = new Date().getHours();
        const sec = new Date().getSeconds();
        const foundConn = connection.find((con) => {
            return con.name === this.request.headers[`${this.tenantIdentifier}`];
        });
        if (foundConn && foundConn.readyState === 1) {
            return foundConn;
        }
        return await this.createConnection();
    }
    async createConnection() {
        const connectionUri = `${process.env.MONGO_URI}/${this.request.headers[`${this.tenantIdentifier}`]}`;
        const connection = await mongoose.createConnection(connectionUri);
        return connection;
    }
    static getTenantFromRequest(request, tenantIdentifier) {
        var _a;
        let tenant = '';
        tenant = ((_a = request.headers[`${tenantIdentifier || ''}`.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.toString()) ||
            '';
        if (this.isEmpty(tenant)) {
            throw new common_1.BadRequestException(`${tenantIdentifier} is not supplied`);
        }
        return tenant;
    }
    static isEmpty(obj) {
        return !obj || !Object.keys(obj).some((x) => obj[x] !== void 0);
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], DatabaseService);
//# sourceMappingURL=database.service.js.map