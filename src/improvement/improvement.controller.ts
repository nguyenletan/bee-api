import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  update(
    @Param('id') id: string,
    @Body() updateImprovementDto: UpdateImprovementDto,
  ) {
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
  @Get(
    '/getNewAnnualLightingSystemEnergyConsumption/:buildingId/:percentReplacement',
  )
  getNewAnnualLightingSystemEnergyConsumption(
    @Param('buildingId') buildingId: string,
    @Param('percentReplacement') percentReplacement: string,
  ) {
    return this.improvementService.getNewAnnualLightingSystemEnergyConsumption(
      +buildingId,
      +percentReplacement,
    );
  }

  // Annual Energy Savings (kWh/Yr) =
  // [Annual Lighting System Energy Consumption (kWh)] - [New Lighting System Energy Consumption (kWh)]
  @Get(
    '/getAnnualEnergySavings/:buildingId/:oldPercentReplacement/:percentReplacement',
  )
  getAnnualEnergySavings(
    @Param('buildingId') buildingId: string,
    @Param('oldPercentReplacement') oldPercentReplacement: string,
    @Param('percentReplacement') percentReplacement: string,
  ) {
    return this.improvementService.getAnnualEnergySavings(
      +buildingId,
      +oldPercentReplacement,
      +percentReplacement,
    );
  }

  @Get(
    '/getAnnualEnergyCostSavings/:buildingId/:oldPercentReplacement/:percentReplacement',
  )
  getAnnualEnergyCostSavings(
    @Param('buildingId') buildingId: string,
    @Param('oldPercentReplacement') oldPercentReplacement: string,
    @Param('percentReplacement') percentReplacement: string,
  ) {
    return this.improvementService.getAnnualEnergyCostSavings(
      +buildingId,
      +oldPercentReplacement,
      +percentReplacement,
    );
  }

  // Annual Carbon Emissions Avoided (Tons/Yr) = [Energy Savings] * [Grid Emission Rate]
  @Get(
    '/getAnnualCarbonEmissionsAvoided/:buildingId/:oldPercentReplacement/:percentReplacement',
  )
  getAnnualCarbonEmissionsAvoided(
    @Param('buildingId') buildingId: string,
    @Param('oldPercentReplacement') oldPercentReplacement: string,
    @Param('percentReplacement') percentReplacement: string,
  ) {
    return this.improvementService.getAnnualCarbonEmissionsAvoided(
      +buildingId,
      +oldPercentReplacement,
      +percentReplacement,
    );
  }

  // Cost of Improvement ($) =
  // [Total Lighting Load] * [(100% -%LED Usage)*(%Replacement)] * [LED Bulb Cost ($/W)] / [LED Efficacy RoT]
  @Get('/getCostOfImprovement/:buildingId/:percentReplacement')
  getCostOfImprovement(
    @Param('buildingId') buildingId: string,
    @Param('percentReplacement') percentReplacement: string,
  ) {
    return this.improvementService.getCostOfImprovement(
      +buildingId,
      +percentReplacement,
    );
  }

  // Payback (Yr) = [Cost of Improvement] / [Annual Energy Cost Savings]
  @Get('/getPayback/:buildingId/:oldPercentReplacement/:percentReplacement')
  getPayback(
    @Param('buildingId') buildingId: string,
    @Param('oldPercentReplacement') oldPercentReplacement: string,
    @Param('percentReplacement') percentReplacement: string,
  ) {
    return this.improvementService.getPayback(
      +buildingId,
      +oldPercentReplacement,
      +percentReplacement,
    );
  }
}
