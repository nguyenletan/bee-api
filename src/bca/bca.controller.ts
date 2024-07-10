import { Controller, Get, Param } from '@nestjs/common';
import { BcaService } from './bca.service';

@Controller('bca')
export class BcaController {
  constructor(private readonly bcaService: BcaService) {}

  // @Get('civic_community_cultural_institution')
  // findAllCivicCommunityCulturalInstitution() {
  //   return this.bcaService.findAllCivicCommunityCulturalInstitution();
  // }
  //
  // @Get('educational_institution')
  // findAllEducationalInstitution() {
  //   return this.bcaService.findAllEducationalInstitution();
  // }
  //
  // @Get('commercial_building')
  // findAllCommercialBuilding() {
  //   return this.bcaService.findAllCommercialBuilding();
  // }
  //
  // @Get('healthcare_facility')
  // findAllHealthcareFacility() {
  //   return this.bcaService.findAllHealthcareFacility();
  // }
  //
  // @Get('sport_recreation_centre')
  // findAllSportRecreationCentre() {
  //   return this.bcaService.findAllSportRecreationCentre();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bcaService.findOne(+id);
  }
}
