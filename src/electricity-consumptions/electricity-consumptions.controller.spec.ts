import { Test, TestingModule } from '@nestjs/testing';
import { ElectricityConsumptionsController } from './electricity-consumptions.controller';
import { ElectricityConsumptionsService } from './electricity-consumptions.service';

describe('ElectricityConsumptionsController', () => {
  let controller: ElectricityConsumptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectricityConsumptionsController],
      providers: [ElectricityConsumptionsService],
    }).compile();

    controller = module.get<ElectricityConsumptionsController>(ElectricityConsumptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
