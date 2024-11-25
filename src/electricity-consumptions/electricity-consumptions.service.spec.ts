import { Test, TestingModule } from '@nestjs/testing';
import { ElectricityConsumptionsService } from './electricity-consumptions.service';

describe('ElectricityConsumptionsService', () => {
  let service: ElectricityConsumptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectricityConsumptionsService],
    }).compile();

    service = module.get<ElectricityConsumptionsService>(ElectricityConsumptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
