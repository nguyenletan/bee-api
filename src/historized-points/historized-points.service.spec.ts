import { Test, TestingModule } from '@nestjs/testing';
import { HistorizedPointsService } from './historized-points.service';

describe('HistorizedPointsService', () => {
  let service: HistorizedPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorizedPointsService],
    }).compile();

    service = module.get<HistorizedPointsService>(HistorizedPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
