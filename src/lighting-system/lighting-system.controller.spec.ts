import { Test, TestingModule } from '@nestjs/testing';
import { LightingSystemController } from './lighting-system.controller';
import { LightingSystemService } from './lighting-system.service';

describe('LightingSystemController', () => {
  let controller: LightingSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightingSystemController],
      providers: [LightingSystemService],
    }).compile();

    controller = module.get<LightingSystemController>(LightingSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
