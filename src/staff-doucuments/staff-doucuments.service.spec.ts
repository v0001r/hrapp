import { Test, TestingModule } from '@nestjs/testing';
import { StaffDoucumentsService } from './staff-doucuments.service';

describe('StaffDoucumentsService', () => {
  let service: StaffDoucumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffDoucumentsService],
    }).compile();

    service = module.get<StaffDoucumentsService>(StaffDoucumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
