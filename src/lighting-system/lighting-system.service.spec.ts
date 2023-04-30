import { Test, TestingModule } from '@nestjs/testing';
import { LightingSystemService } from './lighting-system.service';

describe('LightingSystemService', () => {
  let service: LightingSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightingSystemService],
    }).compile();

    service = module.get<LightingSystemService>(LightingSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
