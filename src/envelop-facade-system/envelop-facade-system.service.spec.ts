import { Test, TestingModule } from '@nestjs/testing';
import { EnvelopFacadeSystemService } from './envelop-facade-system.service';

describe('EnevelopFacadeSystemService', () => {
  let service: EnvelopFacadeSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvelopFacadeSystemService],
    }).compile();

    service = module.get<EnvelopFacadeSystemService>(EnvelopFacadeSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
