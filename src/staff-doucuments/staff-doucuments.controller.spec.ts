import { Test, TestingModule } from '@nestjs/testing';
import { StaffDoucumentsController } from './staff-doucuments.controller';
import { StaffDoucumentsService } from './staff-doucuments.service';

describe('StaffDoucumentsController', () => {
  let controller: StaffDoucumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffDoucumentsController],
      providers: [StaffDoucumentsService],
    }).compile();

    controller = module.get<StaffDoucumentsController>(StaffDoucumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
