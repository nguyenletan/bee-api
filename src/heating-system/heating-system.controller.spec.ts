import { Test, TestingModule } from '@nestjs/testing';
import { HeatingSystemController } from './heating-system.controller';
import { HeatingSystemService } from './heating-system.service';

describe('HeatingSystemController', () => {
  let controller: HeatingSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeatingSystemController],
      providers: [HeatingSystemService],
    }).compile();

    controller = module.get<HeatingSystemController>(HeatingSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
