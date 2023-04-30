import { Test, TestingModule } from '@nestjs/testing';
import { ProgressMockDataController } from './progress-mock-data.controller';
import { ProgressMockDataService } from './progress-mock-data.service';

describe('ProgressMockDataController', () => {
  let controller: ProgressMockDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressMockDataController],
      providers: [ProgressMockDataService],
    }).compile();

    controller = module.get<ProgressMockDataController>(ProgressMockDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
