"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStaffExperienceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_staff_experience_dto_1 = require("./create-staff-experience.dto");
class UpdateStaffExperienceDto extends (0, mapped_types_1.PartialType)(create_staff_experience_dto_1.CreateStaffExperienceDto) {
}
exports.UpdateStaffExperienceDto = UpdateStaffExperienceDto;
//# sourceMappingURL=update-staff-experience.dto.js.map