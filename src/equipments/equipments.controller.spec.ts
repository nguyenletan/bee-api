import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';

describe('EquipmentsController', () => {
  let controller: EquipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentsController],
      providers: [EquipmentsService],
    }).compile();

    controller = module.get<EquipmentsController>(EquipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
