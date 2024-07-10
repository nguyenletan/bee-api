import { Controller, Get, Param } from '@nestjs/common';
import { PCAF_EuropeanCommercialBuildingEmissionFactorService } from './pcaf_european-commercial-building-emission-factor.service';

@Controller('pcaf-european-commercial-building-emission-factor')
export class PCAF_EuropeanCommercialBuildingEmissionFactorController {
  constructor(
    private readonly pcaf_EuropeanCommercialBuildingEmissionFactorService: PCAF_EuropeanCommercialBuildingEmissionFactorService,
  ) {}

  @Get()
  findAll() {
    return this.pcaf_EuropeanCommercialBuildingEmissionFactorService.findAll();
  }

  @Get('sourceName/:sourceName')
  findAllBySourceName(@Param('sourceName') sourceName: string) {
    return this.pcaf_EuropeanCommercialBuildingEmissionFactorService.findAllBySourceName(
      sourceName,
    );
  }

  @Get('sourceNameAndBuildingType/:sourceName/buildingType/:buildingType')
  findAllBySourceAndBuildingType(
    @Param('sourceName') sourceName: string,
    @Param('buildingType') buildingType: string,
  ) {
    return this.pcaf_EuropeanCommercialBuildingEmissionFactorService.findAllBySourceAndBuildingType(
      sourceName,
      buildingType,
    );
  }

  @Get('sourceNameAndCountry/:sourceName/country/:country')
  findAllBySourceNameAndCountry(
    @Param('sourceName') sourceName: string,
    @Param('country') country: string,
  ) {
    return this.pcaf_EuropeanCommercialBuildingEmissionFactorService.findAllBySourceNameAndCountry(
      sourceName,
      country,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pcaf_EuropeanCommercialBuildingEmissionFactorService.findOne(
      +id,
    );
  }
}
