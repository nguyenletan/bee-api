import { Test, TestingModule } from '@nestjs/testing';
import { BcaService } from './bca.service';

describe('BcaService', () => {
  let service: BcaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcaService],
    }).compile();

    service = module.get<BcaService>(BcaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
