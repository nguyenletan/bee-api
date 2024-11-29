import { Test, TestingModule } from '@nestjs/testing';
import { HeatingSystemService } from './heating-system.service';

describe('HeatingSystemService', () => {
  let service: HeatingSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatingSystemService],
    }).compile();

    service = module.get<HeatingSystemService>(HeatingSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
