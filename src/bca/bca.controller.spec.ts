import { Test, TestingModule } from '@nestjs/testing';
import { BcaController } from './bca.controller';
import { BcaService } from './bca.service';

describe('BcaController', () => {
  let controller: BcaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BcaController],
      providers: [BcaService],
    }).compile();

    controller = module.get<BcaController>(BcaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
