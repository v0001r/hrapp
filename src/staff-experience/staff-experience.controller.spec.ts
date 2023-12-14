import { Test, TestingModule } from '@nestjs/testing';
import { StaffExperienceController } from './staff-experience.controller';
import { StaffExperienceService } from './staff-experience.service';

describe('StaffExperienceController', () => {
  let controller: StaffExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffExperienceController],
      providers: [StaffExperienceService],
    }).compile();

    controller = module.get<StaffExperienceController>(StaffExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
