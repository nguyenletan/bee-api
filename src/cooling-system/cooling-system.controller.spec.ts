import { Test, TestingModule } from '@nestjs/testing';
import { CoolingSystemController } from './cooling-system.controller';
import { CoolingSystemService } from './cooling-system.service';

describe('CoolingSystemController', () => {
  let controller: CoolingSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoolingSystemController],
      providers: [CoolingSystemService],
    }).compile();

    controller = module.get<CoolingSystemController>(CoolingSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
