import { Module } from '@nestjs/common';
import { PCAF_EuropeanCommercialBuildingEmissionFactorService } from './pcaf_european-commercial-building-emission-factor.service';
import { PCAF_EuropeanCommercialBuildingEmissionFactorController } from './pcaf_european-commercial-building-emission-factor.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PCAF_EuropeanCommercialBuildingEmissionFactorController],
  providers: [
    PCAF_EuropeanCommercialBuildingEmissionFactorService,
    PrismaService,
  ],
})
export class PCAF_EuropeanCommercialBuildingEmissionFactorModule {}
