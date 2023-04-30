import { Test, TestingModule } from '@nestjs/testing';
import { LightingSystemImprovementService } from './lighting-system-improvement.service';

describe('LightingSystemImprovementService', () => {
  let service: LightingSystemImprovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightingSystemImprovementService],
    }).compile();

    service = module.get<LightingSystemImprovementService>(LightingSystemImprovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
