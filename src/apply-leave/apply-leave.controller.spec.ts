import { Test, TestingModule } from '@nestjs/testing';
import { ApplyLeaveController } from './apply-leave.controller';
import { ApplyLeaveService } from './apply-leave.service';

describe('ApplyLeaveController', () => {
  let controller: ApplyLeaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplyLeaveController],
      providers: [ApplyLeaveService],
    }).compile();

    controller = module.get<ApplyLeaveController>(ApplyLeaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
