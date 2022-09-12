import { Test, TestingModule } from '@nestjs/testing';
import { LightingSystemImprovementController } from './lighting-system-improvement.controller';
import { LightingSystemImprovementService } from './lighting-system-improvement.service';

describe('LightingSystemImprovementController', () => {
  let controller: LightingSystemImprovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightingSystemImprovementController],
      providers: [LightingSystemImprovementService],
    }).compile();

    controller = module.get<LightingSystemImprovementController>(LightingSystemImprovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
