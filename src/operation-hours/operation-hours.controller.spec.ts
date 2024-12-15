import { Test, TestingModule } from '@nestjs/testing';
import { OperationHoursController } from './operation-hours.controller';
import { OperationHoursService } from './operation-hours.service';

describe('OperationHoursController', () => {
  let controller: OperationHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationHoursController],
      providers: [OperationHoursService],
    }).compile();

    controller = module.get<OperationHoursController>(OperationHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
