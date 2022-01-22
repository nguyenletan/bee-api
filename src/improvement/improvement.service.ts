import { Injectable } from '@nestjs/common';
import { CreateImprovementDto } from './dto/create-improvement.dto';
import { UpdateImprovementDto } from './dto/update-improvement.dto';
import { PrismaService } from '../prisma.service';
import { Utilities } from '../shared/utilities';
import { EnergyConsumptionFormulas } from '../shared/formulas/energyConsumptionFormulas';

import { HistorizedPointsService } from '../historized-points/historized-points.service';

@Injectable()
export class ImprovementService {
  constructor(
    private prismaService: PrismaService,
    private historizedPointsService: HistorizedPointsService,
  ) {}

  create(createImprovementDto: CreateImprovementDto) {
    return 'This action adds a new improvement';
  }

  findAll() {
    return `This action returns all improvement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} improvement`;
  }

  update(id: number, updateImprovementDto: UpdateImprovementDto) {
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

  async getNewAnnualLightingSystemEnergyConsumption(
    buildingId: number,
    percentReplacement: number,
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

    return EnergyConsumptionFormulas.calculateNewAnnualLightingSystemEnergyConsumption(
      spaceUsages,
      totalFloorArea,
      operationHours,
      percentReplacement,
      lightingSystems,
    );
  }

  async getAnnualLightingSystemEnergyConsumption(buildingId: number) {
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
  async getAnnualEnergySavings(buildingId: number, percentReplacement: number) {
    return (
      (await this.getNewAnnualLightingSystemEnergyConsumption(
        buildingId,
        percentReplacement,
      )) - (await this.getAnnualLightingSystemEnergyConsumption(buildingId))
    );
  }

  // Annual Energy Cost Savings ($/Yr) = [Energy Savings] * [Tariff Rate]
  async getAnnualEnergyCostSavings(
    buildingId: number,
    percentReplacement: number,
  ) {
    const tariffRate = 0.23;
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

    // const electricConsumptionsFromHistorizedLogs =
    //   await this.buildingsService.getListOfElectricConsumptionsFromHistorizedLogs(
    //     prop[0].propId,
    //     new Date('2020/01/01'),
    //     new Date('2020/12/31'),
    //   );

    // const overallGroupByYear =
    //   await this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByYear(
    //     prop.id,
    //     new Date('2020/01/02'),
    //     new Date('2020/12/31'),
    //   );
    //
    // console.log(overallGroupByYear[0]?.value);
    //
    // const totalConsumption = overallGroupByYear[0]?.value;

    // const overallEnergyConsumptionInformation =
    //   BuildingsService.calculateOverallEnergyConsumptionInformation(
    //     electricConsumptionsFromHistorizedLogs,
    //   );

    return EnergyConsumptionFormulas.calculateAnnualEnergyCostSavings(
      spaceUsages,
      totalFloorArea,
      operationHours,
      percentReplacement,
      tariffRate,
      lightingSystems,
    );
  }

  // // Annual Carbon Emissions Avoided (Tons/Yr) = [Energy Savings] * [Grid Emission Rate]
  async getAnnualCarbonEmissionsAvoided(
    buildingId: number,
    percentReplacement: number,
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

    return EnergyConsumptionFormulas.calculateAnnualCarbonEmissionsAvoided(
      spaceUsages,
      totalFloorArea,
      operationHours,
      percentReplacement,
      prop.countryCode,
      lightingSystems,
    );
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
  async getPayback(buildingId: number, percentReplacement: number) {
    const tariffRate = 0.23;
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

    const percentLEDUsage = lightingSystems.find(
      (x) => x.lightingFittingTypeId === 1,
    ).percentageOfFittingTypeUsed;

    return EnergyConsumptionFormulas.calculatePayback(
      spaceUsages,
      totalFloorArea,
      percentLEDUsage,
      percentReplacement,
      operationHours,
      tariffRate,
      lightingSystems,
    );
  }
}
