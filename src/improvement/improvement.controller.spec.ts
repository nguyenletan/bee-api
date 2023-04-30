import { Test, TestingModule } from '@nestjs/testing';
import { ImprovementController } from './improvement.controller';
import { ImprovementService } from './improvement.service';

describe('ImprovementController', () => {
  let controller: ImprovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImprovementController],
      providers: [ImprovementService],
    }).compile();

    controller = module.get<ImprovementController>(ImprovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
