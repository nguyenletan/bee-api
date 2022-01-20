import { Test, TestingModule } from '@nestjs/testing';
import { ImprovementService } from './improvement.service';

describe('ImprovementService', () => {
  let service: ImprovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImprovementService],
    }).compile();

    service = module.get<ImprovementService>(ImprovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
