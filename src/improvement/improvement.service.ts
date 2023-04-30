import { Injectable } from '@nestjs/common';
import { add } from 'date-fns';
import { sumBy } from 'lodash';
import { CreateImprovementDto } from './dto/create-improvement.dto';
import { UpdateImprovementDto } from './dto/update-improvement.dto';
import { PrismaService } from '../prisma.service';
import { Utilities } from '../shared/utilities';
import { EnergyConsumptionFormulas } from '../shared/formulas/energyConsumptionFormulas';

import { HistorizedPointsService } from '../historized-points/historized-points.service';
import { EnergyCO2EmissionFormulas } from '../shared/formulas/energyCO2EmissionFormulas';

@Injectable()
export class ImprovementService {
  constructor(
    private prismaService: PrismaService,
    private historizedPointsService: HistorizedPointsService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createImprovementDto: CreateImprovementDto) {
    return 'This action adds a new improvement';
  }

  findAll() {
    return `This action returns all improvement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} improvement`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateImprovementDto: UpdateImprovementDto) {
    return `This action updates a #${id} improvement`;
  }

  remove(id: number) {
    return `This action removes a #${id} improvement`;
  }

  async getLightingInfo(buildingId: number) {
    return this.prismaService.$queryRaw`
        SELECT LS.id, LS."lightingFittingTypeId", LFT.name, LS."percentageOfFittingTypeUsed", LS."estimatedLightingLoad"
        FROM "Building" B
                 INNER JOIN "Property" P on B.id = P."buildingId"
                 INNER JOIN "LightingSystem" LS on P.id = LS."propId"
                 INNER JOIN "LightingFittingType" LFT on LS."lightingFittingTypeId" = LFT.id
        WHERE "buildingId" = ${buildingId}`;
  }

  // New Annual Lighting System Energy Consumption (kWh) =
  // ([Current Lighting Efficacy (lm/W)] / [New Lighting Efficacy (lm/W)])
  // * ([Baseline Annual Lighting System Energy Consumption (kWh)])
  async getNewAnnualLightingSystemEnergyConsumption(
    buildingId: number,
    percentReplacement: number,
    period: number,
    startDate: Date,
    newLightingSystem: any,
  ) {
    const prop = await this.prismaService.property.findFirst({
      where: {
        buildingId: {
          equals: buildingId,
        },
      },
    });

    const lightingSystems = await this.prismaService.lightingSystem.findMany({
      where: {
        propId: {
          equals: prop.id,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    const baselineAnnualLightingSystemEnergyConsumption =
      await this.getBaselineAnnualLightingSystemEnergyConsumption(
        buildingId,
        period,
        startDate,
      );

    const currentLightingEfficacy =
      EnergyConsumptionFormulas.calculateOverallLightingEfficacy(
        lightingSystems,
      );

    const newLightingEfficacy = +sumBy(newLightingSystem, (item: any) => {
      if (item.lumensOfBulb > 0) {
        return item.wattRatingOfBulb / item.lumensOfBulb;
      }
      return 0;
    }).toFixed(2);

    return (
      (currentLightingEfficacy / newLightingEfficacy) *
      baselineAnnualLightingSystemEnergyConsumption
    );
  }

  async getBaselineAnnualLightingSystemEnergyConsumption(
    buildingId: number,
    period: number,
    startDate: Date,
  ) {
    const prop = await this.prismaService.property.findFirst({
      where: {
        buildingId: {
          equals: buildingId,
        },
      },
    });

    // console.log(startDate);
    // console.log(add(startDate, { years: period }));

    const totalHistorizedLightingSystemConsumption =
      await this.historizedPointsService.sumAllLightingHistorizedPointsByPropertyIdAndDateRange(
        prop.id,
        startDate,
        add(startDate, { years: period }),
      );

    if (totalHistorizedLightingSystemConsumption[0].sum > 0) {
      return totalHistorizedLightingSystemConsumption[0].sum / period;
    }
    const lightingSystems = await this.prismaService.lightingSystem.findMany({
      where: {
        propId: {
          equals: prop.id,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const operationHours =
      await this.prismaService.averageOperatingHours.findFirst({
        where: {
          propId: {
            equals: prop.id,
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

    const spaceUsages = await this.prismaService.spaceUsage.findMany({
      where: {
        AND: [
          {
            propId: {
              equals: prop.id,
            },
          },
          {
            climateControlId: {
              in: [1, 2, 3, 4],
            },
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });

    const totalFloorArea =
      prop.grossInteriorAreaUnit === 'ft2'
        ? Utilities.convertFt2ToM2(prop.grossInteriorArea)
        : prop.grossInteriorArea;

    return EnergyConsumptionFormulas.calculateAnnualLightingSystemEnergyConsumption(
      spaceUsages,
      totalFloorArea,
      operationHours,
      lightingSystems,
    );
  }

  // Annual Energy Savings (kWh/Yr) =
  // [Annual Lighting System Energy Consumption (kWh)] - [New Lighting System Energy Consumption (kWh)]
  async getAnnualEnergySavings(
    buildingId: number,
    percentReplacement: number,
    period: number,
    startDate: Date,
    lightingSystem: any,
  ) {
    return (
      (await this.getBaselineAnnualLightingSystemEnergyConsumption(
        buildingId,
        period,
        startDate,
      )) -
      (await this.getNewAnnualLightingSystemEnergyConsumption(
        buildingId,
        percentReplacement,
        period,
        startDate,
        lightingSystem,
      ))
    );
  }

  // Annual Energy Cost Savings ($/Yr) = [Energy Savings] * [Tariff Rate]
  async getAnnualEnergyCostSavings(
    buildingId: number,
    percentReplacement: number,
    period: number,
    startDate: Date,
  ) {
    const tariffRate = 0.23;
    return 0;
    // return (
    //   (await this.getAnnualEnergySavings(
    //     buildingId,
    //     percentReplacement,
    //     period,
    //     startDate,
    //   )) * tariffRate
    // );
  }

  // // Annual Carbon Emissions Avoided (Tons/Yr) = [Energy Savings] * [Grid Emission Rate]
  async getAnnualCarbonEmissionsAvoided(
    buildingId: number,
    percentReplacement: number,
    period: number,
    startDate: Date,
  ) {
    const prop = await this.prismaService.property.findFirst({
      where: {
        buildingId: {
          equals: buildingId,
        },
      },
    });

    return 0;

    // const annualEnergySavings = await this.getAnnualEnergySavings(
    //   buildingId,
    //   percentReplacement,
    //   period,
    //   startDate,
    // );
    // return EnergyCO2EmissionFormulas.calculateC02EmissionForEachSystem(
    //   annualEnergySavings,
    //   prop.countryCode,
    // );
  }

  // Cost of Improvement ($) =
  // [Total Lighting Load] * [(100% -%LED Usage)*(%Replacement)] * [LED Bulb Cost ($/W)] / [LED Efficacy RoT]
  async getCostOfImprovement(buildingId: number, percentReplacement: number) {
    const prop = await this.prismaService.property.findFirst({
      where: {
        buildingId: {
          equals: buildingId,
        },
      },
    });
    const lightingSystems = await this.prismaService.lightingSystem.findMany({
      where: {
        propId: {
          equals: prop.id,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const spaceUsages = await this.prismaService.spaceUsage.findMany({
      where: {
        AND: [
          {
            propId: {
              equals: prop.id,
            },
          },
          {
            climateControlId: {
              in: [1, 2, 3, 4],
            },
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });

    const totalFloorArea =
      prop.grossInteriorAreaUnit === 'ft2'
        ? Utilities.convertFt2ToM2(prop.grossInteriorArea)
        : prop.grossInteriorArea;

    const percentLEDUsage = lightingSystems.find(
      (x) => x.lightingFittingTypeId === 1,
    ).percentageOfFittingTypeUsed;

    // return 0;
    return EnergyConsumptionFormulas.calculateCostOfImprovement(
      spaceUsages,
      totalFloorArea,
      percentLEDUsage,
      percentReplacement,
      lightingSystems,
    );
  }

  // Payback (Yr) = [Cost of Improvement] / [Annual Energy Cost Savings]
  async getPayback(
    buildingId: number,
    percentReplacement: number,
    period: number,
    startDate: Date,
  ) {
    return (
      (await this.getCostOfImprovement(buildingId, percentReplacement)) -
      (await this.getAnnualEnergyCostSavings(
        buildingId,
        percentReplacement,
        period,
        startDate,
      ))
    );
  }
}
