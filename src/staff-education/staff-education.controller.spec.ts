import { Test, TestingModule } from '@nestjs/testing';
import { StaffEducationController } from './staff-education.controller';
import { StaffEducationService } from './staff-education.service';

describe('StaffEducationController', () => {
  let controller: StaffEducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffEducationController],
      providers: [StaffEducationService],
    }).compile();

    controller = module.get<StaffEducationController>(StaffEducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
