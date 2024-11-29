import { Test, TestingModule } from '@nestjs/testing';
import { CoolingSystemService } from './cooling-system.service';

describe('CoolingSystemService', () => {
  let service: CoolingSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoolingSystemService],
    }).compile();

    service = module.get<CoolingSystemService>(CoolingSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
