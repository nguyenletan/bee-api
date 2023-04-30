import { Test, TestingModule } from '@nestjs/testing';
import { ProgressMockDataService } from './progress-mock-data.service';

describe('ProgressMockDataService', () => {
  let service: ProgressMockDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressMockDataService],
    }).compile();

    service = module.get<ProgressMockDataService>(ProgressMockDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
