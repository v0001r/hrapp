"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_branch_dto_1 = require("./create-branch.dto");
class UpdateBranchDto extends (0, mapped_types_1.PartialType)(create_branch_dto_1.CreateBranchDto) {
}
exports.UpdateBranchDto = UpdateBranchDto;
//# sourceMappingURL=update-branch.dto.js.map