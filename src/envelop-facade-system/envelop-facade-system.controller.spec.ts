import { Test, TestingModule } from '@nestjs/testing';
import { EnvelopFacadeSystemController } from './envelop-facade-system.controller';
import { EnvelopFacadeSystemService } from './envelop-facade-system.service';

describe('EnvelopFacadeSystemController', () => {
  let controller: EnvelopFacadeSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvelopFacadeSystemController],
      providers: [EnvelopFacadeSystemService],
    }).compile();

    controller = module.get<EnvelopFacadeSystemController>(EnvelopFacadeSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
