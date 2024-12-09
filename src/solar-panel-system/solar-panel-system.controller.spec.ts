import { Test, TestingModule } from '@nestjs/testing';
import { SolarPanelSystemController } from './solar-panel-system.controller';
import { SolarPanelSystemService } from './solar-panel-system.service';

describe('SolarPanelSystemController', () => {
  let controller: SolarPanelSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolarPanelSystemController],
      providers: [SolarPanelSystemService],
    }).compile();

    controller = module.get<SolarPanelSystemController>(SolarPanelSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
