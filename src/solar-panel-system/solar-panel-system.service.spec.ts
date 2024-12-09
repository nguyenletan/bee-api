import { Test, TestingModule } from '@nestjs/testing';
import { SolarPanelSystemService } from './solar-panel-system.service';

describe('SolarPanelSystemService', () => {
  let service: SolarPanelSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolarPanelSystemService],
    }).compile();

    service = module.get<SolarPanelSystemService>(SolarPanelSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
