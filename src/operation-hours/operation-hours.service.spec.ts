import { Test, TestingModule } from '@nestjs/testing';
import { OperationHoursService } from './operation-hours.service';

describe('OperationHoursService', () => {
  let service: OperationHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationHoursService],
    }).compile();

    service = module.get<OperationHoursService>(OperationHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
