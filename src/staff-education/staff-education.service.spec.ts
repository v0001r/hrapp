import { Test, TestingModule } from '@nestjs/testing';
import { StaffEducationService } from './staff-education.service';

describe('StaffEducationService', () => {
  let service: StaffEducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffEducationService],
    }).compile();

    service = module.get<StaffEducationService>(StaffEducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
