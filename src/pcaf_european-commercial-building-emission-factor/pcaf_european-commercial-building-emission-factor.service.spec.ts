import { Test, TestingModule } from '@nestjs/testing';
import { PCAF_EuropeanCommercialBuildingEmissionFactorService } from './pcaf_european-commercial-building-emission-factor.service';

describe('PCAF_EuropeanCommercialBuildingEmissionFactorService', () => {
  let service: PCAF_EuropeanCommercialBuildingEmissionFactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PCAF_EuropeanCommercialBuildingEmissionFactorService],
    }).compile();

    service = module.get<PCAF_EuropeanCommercialBuildingEmissionFactorService>(PCAF_EuropeanCommercialBuildingEmissionFactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
