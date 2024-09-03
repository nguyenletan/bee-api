import { Test, TestingModule } from '@nestjs/testing';
import { HistorizedPointsController } from './historized-points.controller';
import { HistorizedPointsService } from './historized-points.service';

describe('HistorizedPointsController', () => {
  let controller: HistorizedPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorizedPointsController],
      providers: [HistorizedPointsService],
    }).compile();

    controller = module.get<HistorizedPointsController>(HistorizedPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
