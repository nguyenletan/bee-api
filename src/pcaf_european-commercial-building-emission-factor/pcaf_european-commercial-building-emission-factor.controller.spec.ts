import { Test, TestingModule } from '@nestjs/testing';
import { PCAF_EuropeanCommercialBuildingEmissionFactorController } from './pcaf_european-commercial-building-emission-factor.controller';
import { PCAF_EuropeanCommercialBuildingEmissionFactorService } from './pcaf_european-commercial-building-emission-factor.service';

describe('PCAF_EuropeanCommercialBuildingEmissionFactorController', () => {
  let controller: PCAF_EuropeanCommercialBuildingEmissionFactorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PCAF_EuropeanCommercialBuildingEmissionFactorController],
      providers: [PCAF_EuropeanCommercialBuildingEmissionFactorService],
    }).compile();

    controller = module.get<PCAF_EuropeanCommercialBuildingEmissionFactorController>(PCAF_EuropeanCommercialBuildingEmissionFactorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
