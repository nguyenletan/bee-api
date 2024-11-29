import { Test, TestingModule } from '@nestjs/testing';
import { HeatingConsumptionsService } from './heating-consumptions.service';

describe('HeatingConsumptionsService', () => {
  let service: HeatingConsumptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatingConsumptionsService],
    }).compile();

    service = module.get<HeatingConsumptionsService>(HeatingConsumptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
