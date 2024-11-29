import { Test, TestingModule } from '@nestjs/testing';
import { HeatingConsumptionsController } from './heating-consumptions.controller';
import { HeatingConsumptionsService } from './heating-consumptions.service';

describe('HeatingConsumptionsController', () => {
  let controller: HeatingConsumptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeatingConsumptionsController],
      providers: [HeatingConsumptionsService],
    }).compile();

    controller = module.get<HeatingConsumptionsController>(HeatingConsumptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
