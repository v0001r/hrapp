import { Test, TestingModule } from '@nestjs/testing';
import { ApplyLeaveService } from './apply-leave.service';

describe('ApplyLeaveService', () => {
  let service: ApplyLeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyLeaveService],
    }).compile();

    service = module.get<ApplyLeaveService>(ApplyLeaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
