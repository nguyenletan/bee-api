import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ImprovementService } from './improvement.service';
import { CreateImprovementDto } from './dto/create-improvement.dto';
import { UpdateImprovementDto } from './dto/update-improvement.dto';

@Controller('improvement')
export class ImprovementController {
  constructor(private readonly improvementService: ImprovementService) {}

  @Post()
  create(@Body() createImprovementDto: CreateImprovementDto) {
    return this.improvementService.create(createImprovementDto);
  }

  @Get()
  findAll() {
    return this.improvementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.improvementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImprovementDto: UpdateImprovementDto) {
    return this.improvementService.update(+id, updateImprovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.improvementService.remove(+id);
  }

  @Get('/getLightingInfo/:buildingId')
  getLightingInfo(@Param('buildingId') buildingId: string) {
    return this.improvementService.getLightingInfo(+buildingId);
  }

  // New Annual Lighting System Energy Consumption (kWh) =
  // ([Total Lighting Load] * [Annual Operating Hours]) / (1000  * [New Overall Lighting Efficacy])
  @Get('/getNewAnnualLightingSystemEnergyConsumption/:buildingId/:percentReplacement/:period/:startDate/')
  getNewAnnualLightingSystemEnergyConsumption(
    @Param('buildingId') buildingId: string,
    @Param('percentReplacement') percentReplacement: string,
    @Param('period') period: string,
    @Param('startDate') startDate: string
  ) {
    return 0;
    // return this.improvementService.getNewAnnualLightingSystemEnergyConsumption(
    //   +buildingId,
    //   +percentReplacement,
    //   +period,
    //   new Date(startDate),
    // );
  }

  // Annual Energy Savings (kWh/Yr) =
  // [Annual Lighting System Energy Consumption (kWh)] - [New Lighting System Energy Consumption (kWh)]
  @Post('/getAnnualEnergySavings/')
  getAnnualEnergySavings(
    // @Param('buildingId') buildingId: string,
    // @Param('percentReplacement') percentReplacement: string,
    // @Param('period') period: string,
    // @Param('startDate') startDate: string,
    @Body()
    data: {
      lightingSystem: any;
      buildingId: string;
      percentReplacement: string;
      period: string;
      startDate: string;
    }
  ) {
    return this.improvementService.getAnnualEnergySavings(
      +data.buildingId,
      +data.percentReplacement,
      +data.period,
      new Date(data.startDate),
      data.lightingSystem
    );
  }

  @Get('/getAnnualEnergyCostSavings/:buildingId/:percentReplacement/:period/:startDate/')
  getAnnualEnergyCostSavings(
    @Param('buildingId') buildingId: string,
    @Param('percentReplacement') percentReplacement: string,
    @Param('period') period: string,
    @Param('startDate') startDate: string
  ) {
    return this.improvementService.getAnnualEnergyCostSavings(+buildingId, +percentReplacement, +period, new Date(startDate));
  }

  // Annual Carbon Emissions Avoided (Tons/Yr) = [Energy Savings] * [Grid Emission Rate]
  @Get('/getAnnualCarbonEmissionsAvoided/:buildingId/:percentReplacement/:period/:startDate/')
  getAnnualCarbonEmissionsAvoided(
    @Param('buildingId') buildingId: string,
    @Param('percentReplacement') percentReplacement: string,
    @Param('period') period: string,
    @Param('startDate') startDate: string
  ) {
    return this.improvementService.getAnnualCarbonEmissionsAvoided(+buildingId, +percentReplacement, +period, new Date(startDate));
  }

  // Cost of Improvement ($) =
  // [Total Lighting Load] * [(100% -%LED Usage)*(%Replacement)] * [LED Bulb Cost ($/W)] / [LED Efficacy RoT]
  @Get('/getCostOfImprovement/:buildingId/:percentReplacement')
  getCostOfImprovement(@Param('buildingId') buildingId: string, @Param('percentReplacement') percentReplacement: string) {
    return this.improvementService.getCostOfImprovement(+buildingId, +percentReplacement);
  }

  // Payback (Yr) = [Cost of Improvement] / [Annual Energy Cost Savings]
  @Get('/getPayback/:buildingId/:percentReplacement/:period/:startDate/')
  getPayback(
    @Param('buildingId') buildingId: string,
    @Param('percentReplacement') percentReplacement: string,
    @Param('period') period: string,
    @Param('startDate') startDate: string
  ) {
    return this.improvementService.getPayback(+buildingId, +percentReplacement, +period, new Date(startDate));
  }
}
