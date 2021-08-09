import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

import {
  CreateBuildingDto,
  IElectricityConsumption,
  ILightingSubSystem,
  ISolarPanelSystem,
  ISpaceUsageGFA,
} from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from '../prisma.service';
import {
  AverageOperatingHours,
  ElectricityConsumption,
  LightingSystem,
  SolarPanelSystem,
  SpaceUsage,
} from '@prisma/client';
import * as _ from 'lodash';
import { EnergyConsumptionFormulas } from '../shared/formulas/energyConsumptionFormulas';
import { Utilities } from '../shared/utilities';
import { ICoolingLoadForGeneralSpace } from '../shared/types/iCoolingLoadForGeneralSpace';
import { IHeatingLoadForGeneralSpace } from '../shared/types/iHeatingLoadForGeneralSpace';
import { IMechanicalVentilationForGeneralSpace } from '../shared/types/iMechanicalVentilationForGeneralSpace';
import { ILightingLoadForSpace } from '../shared/types/iLightingLoadForSpace';
import { IBreakdownConsumption } from '../shared/types/iBreakdownConsumption';

@Injectable()
export class BuildingsService {
  constructor(private prismaService: PrismaService) {}

  private static calculateCoolingLoadForGeneralSpace(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
  ): ICoolingLoadForGeneralSpace {
    const result: ICoolingLoadForGeneralSpace = {
      coolingLoad: 0,
      coolingLoadForSpace: 0,
    };
    if (spaceUsages) {
      for (const spaceUsage of spaceUsages) {
        if (
          spaceUsage.climateControlId === 2 ||
          spaceUsage.climateControlId === 3
        ) {
          const coolingLoadForGeneralSpace =
            EnergyConsumptionFormulas.calculateCoolingLoadForGeneralSpace(
              spaceUsage,
              totalFloorArea,
              spaceUsage.usagePercentage,
              annualTotalOperatingHours,
            );
          if (coolingLoadForGeneralSpace) {
            result.coolingLoad +=
              coolingLoadForGeneralSpace.coolingLoad *
              (spaceUsage.usagePercentage / 100);
            result.coolingLoadForSpace +=
              coolingLoadForGeneralSpace.coolingLoadForSpace;
          }
        }
      }
    }

    return result;
  }

  private static calculateHeatingLoadForGeneralSpace(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
    heatingSystem: any,
  ): IHeatingLoadForGeneralSpace {
    const result: IHeatingLoadForGeneralSpace = {
      heatingLoad: 0,
      heatingLoadForSpace: 0,
    };
    if (spaceUsages) {
      for (const spaceUsage of spaceUsages) {
        if (
          spaceUsage.climateControlId === 1 ||
          spaceUsage.climateControlId === 3
        ) {
          const heatingLoadForGeneralSpace =
            EnergyConsumptionFormulas.calculateHeatingLoadForGeneralSpace(
              spaceUsage,
              totalFloorArea,
              spaceUsage.usagePercentage,
              annualTotalOperatingHours,
              heatingSystem,
            );
          if (heatingLoadForGeneralSpace) {
            result.heatingLoad +=
              heatingLoadForGeneralSpace.heatingLoad *
              (spaceUsage.usagePercentage / 100);
            result.heatingLoadForSpace +=
              heatingLoadForGeneralSpace.heatingLoadForSpace;
          }
        }
      }
    }

    return result;
  }

  private static calculateLightingLoadForSpaces(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
    lightingSystems: LightingSystem[],
  ): ILightingLoadForSpace {
    const result: ILightingLoadForSpace = {
      lightingLoad: 0,
      lightingEnergyConsumption: 0,
    };

    if (spaceUsages) {
      let totalLightingEnergyUse = 0; // W
      for (const spaceUsage of spaceUsages) {
        totalLightingEnergyUse +=
          EnergyConsumptionFormulas.calculateLightingEnergyUseForSpace(
            spaceUsage,
            totalFloorArea,
            lightingSystems,
          );
      }
      result.lightingEnergyConsumption =
        (totalLightingEnergyUse * annualTotalOperatingHours) / 1000; //(kWh)

      result.lightingLoad = result.lightingEnergyConsumption / totalFloorArea; //(W/m2)
    }
    return result;
  }

  private static calculateMechanicalVentilationForGeneralSpace(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
  ): IMechanicalVentilationForGeneralSpace {
    const result: IMechanicalVentilationForGeneralSpace = {
      airVolumeFlowRate: 0,
      annualEnergyUsage: 0,
    };
    if (spaceUsages) {
      for (const spaceUsage of spaceUsages) {
        if (spaceUsage.climateControlId === 4) {
          const mechanicalVentilationForGeneralSpace =
            EnergyConsumptionFormulas.calculateAnnualEnergyUsageForEachMechanicallyVentilatedSpace(
              spaceUsage,
              totalFloorArea,
              annualTotalOperatingHours,
            );
          if (mechanicalVentilationForGeneralSpace) {
            result.airVolumeFlowRate +=
              mechanicalVentilationForGeneralSpace.airVolumeFlowRate *
              (spaceUsage.usagePercentage / 100);
            result.annualEnergyUsage +=
              mechanicalVentilationForGeneralSpace.annualEnergyUsage;
          }
        }
      }
    }

    return result;
  }

  private static getConsumptionBreakdown(
    coolingLoadConsumption: number,
    heatingLoadConsumption: number,
    mechanicalVentilationConsumption: number,
    lightingLoadConsumption: number,
    otherConsumption: number,
  ): IBreakdownConsumption[] {
    const total =
      coolingLoadConsumption +
      heatingLoadConsumption +
      mechanicalVentilationConsumption +
      lightingLoadConsumption +
      otherConsumption;

    // console.log(total);

    const coolingLoadConsumptionPercentage = +(
      (coolingLoadConsumption * 100) /
      total
    ).toFixed(2);

    const heatingLoadConsumptionPercentage = +(
      (heatingLoadConsumption * 100) /
      total
    ).toFixed(2);

    const mechanicalVentilationConsumptionPercentage = +(
      (mechanicalVentilationConsumption * 100) /
      total
    ).toFixed(2);

    const lightingLoadConsumptionPercentage = +(
      (lightingLoadConsumption * 100) /
      total
    ).toFixed(2);

    const otherConsumptionPercentage =
      100 -
      (coolingLoadConsumptionPercentage +
        heatingLoadConsumptionPercentage +
        mechanicalVentilationConsumptionPercentage +
        lightingLoadConsumptionPercentage);

    return [
      {
        id: 'cooling',
        value: coolingLoadConsumptionPercentage,
        color: '#636c2e',
      },
      {
        id: 'heating',
        value: heatingLoadConsumptionPercentage,
        color: '#87972f',
      },
      {
        id: 'lighting',
        value: +lightingLoadConsumptionPercentage,
        color: '#acbf42',
      },
      {
        id: 'mechanical ventilation',
        value: mechanicalVentilationConsumptionPercentage,
        color: '#c1cf74',
      },
      {
        id: 'others',
        value: otherConsumptionPercentage,
        color: '#d5dfa3',
      },
    ];
  }

  async create(createBuildingDto: CreateBuildingDto, user: any) {
    //console.log(createBuildingDto);

    // if (
    //   await this.prismaService.building.findUnique({
    //     where: {
    //       name: createBuildingDto.generalBuildingInformation.buildingName,
    //     },
    //   })
    // ) {
    //   console.log('Existing building');
    //   throw new HttpException('Existing building', 406);
    // }

    /// mapping for averageOperatingHours
    const averageOperatingHours: AverageOperatingHours = <
      AverageOperatingHours
    >{};

    for (const item of createBuildingDto?.buildingActivity) {
      if (item.isEnable) {
        averageOperatingHours[item.codeName + 'Start'] = format(
          new Date(item.startTime),
          'HH:mm',
        );
        averageOperatingHours[item.codeName + 'End'] = format(
          new Date(item.endTime),
          'HH:mm',
        );
      } else {
        averageOperatingHours[item.codeName + 'Start'] = null;
        averageOperatingHours[item.codeName + 'End'] = null;
      }
    }

    const electricityConsumptionList =
      createBuildingDto?.electricityConsumptionList.map(
        (item: IElectricityConsumption) => {
          return <ElectricityConsumption>{
            month: item.month,
            year: item.year,
            monthlyValue: Number(item.value),
            monthlyCost: Number(item.cost),
          };
        },
      );

    const lightingSubSystemList = createBuildingDto?.lightingSubSystemList.map(
      (item: ILightingSubSystem) => {
        return <LightingSystem>{
          lightingFittingTypeId: item.indoorLightingSystemTypeId,
          percentageOfFittingTypeUsed: Number(item.percentage),
        };
      },
    );

    const spaceUsageGFAList = createBuildingDto?.spaceUsageGFAList.map(
      (item: ISpaceUsageGFA) => {
        return <SpaceUsage>{
          usageTypeId: item.typeId,
          usagePercentage: item.percentage,
          climateControlId: item.climateControlId,
          title: item.title,
          fanTypeId: item.fanTypeId,
          hasReheatRecovery: item.hasReheatRecovery,
        };
      },
    );

    const solarPanelSystemList = createBuildingDto?.solarPanelSystemList.map(
      (item: ISolarPanelSystem) => {
        return <SolarPanelSystem>{
          systemLoss: item.systemLoss,
          installedCapacity: Number(item.installedCapacity),
          pvTechChoiceId: item.pvTechChoiceId,
          inclineAngle:
            item.trackingTypeId === 1 || item.trackingTypeId === 2
              ? item.inclineAngel
              : null,
          trackingTypeId: item.trackingTypeId,
          mountingTypeId: item.mountingTypeId,
          orientationAngle:
            item.trackingTypeId === 1 || item.trackingTypeId === 3
              ? item.orientationAngle
              : null,
        };
      },
    );

    const addingBuildingObject = {
      name: createBuildingDto.generalBuildingInformation.buildingName,

      storeysBelowGround: Number(
        createBuildingDto.generalBuildingInformation.storeysBelowGround,
      ),

      storeysAboveGround: Number(
        createBuildingDto.generalBuildingInformation.storeysAboveGround,
      ),

      numberOfFloorAboveGroundLvl: 0,

      numberOfFloorBelowGroundLvl: 0,

      buildingMajorOrientationId: 1,

      averageInternalFloorToCeilingHeight: Number(
        createBuildingDto.generalBuildingInformation
          .avgInternalFloorToCeilingHeight,
      ),

      averageInternalFloorToCeilingHeightUnit:
        createBuildingDto.generalBuildingInformation
          .avgInternalFloorToCeilingHeightUnit,

      Property: {
        create: {
          streetAddress: createBuildingDto.generalBuildingInformation.address,

          postCode: createBuildingDto.generalBuildingInformation.postalCode,

          state: createBuildingDto.generalBuildingInformation.state,

          city: createBuildingDto.generalBuildingInformation.city,

          countryCode: createBuildingDto.generalBuildingInformation.countryCode,

          grossFloorArea: 0,

          grossInteriorArea: Number(
            createBuildingDto.generalBuildingInformation.grossInteriorArea,
          ),

          grossInteriorAreaUnit:
            createBuildingDto.generalBuildingInformation.grossInteriorAreaUnit,

          netUsableArea: Number(
            createBuildingDto.generalBuildingInformation.netUsableArea,
          ),

          netUsableAreaUnit:
            createBuildingDto.generalBuildingInformation.netUsableAreaUnit,

          latitude: createBuildingDto.generalBuildingInformation.location?.lat,

          longitude: createBuildingDto.generalBuildingInformation.location?.lng,

          majorOrientationId:
            createBuildingDto.generalBuildingInformation.buildingOrientedId,

          completionYear: Number(
            createBuildingDto.generalBuildingInformation
              .constructionPeriodValue,
          ),

          sustainabilityRatingSchemeId: Number(
            createBuildingDto.generalBuildingInformation
              .sustainabilityRatingSchemeId,
          ),

          sustainabilityRatingId: Number(
            createBuildingDto.generalBuildingInformation.sustainabilityRatingId,
          ),

          useTypeId: Number(
            createBuildingDto.generalBuildingInformation.useTypeId,
          ),

          photo: createBuildingDto.generalBuildingInformation.buildingPhoto,

          hasMajorRefurbishmentOrExtensionsDone:
            createBuildingDto.generalBuildingInformation
              .hasMajorRefurbishmentOrExtensionsDone,

          latestYearForRefurbishmentOrExtension:
            createBuildingDto.generalBuildingInformation
              .latestYearForRefurbishmentOrExtension,

          AverageOperatingHours: {
            create: {
              ...averageOperatingHours,
            },
          },

          SpaceUsage: {
            create: spaceUsageGFAList,
          },

          ElectricityConsumption: {
            create: electricityConsumptionList,
          },

          LightingSystem: {
            create: lightingSubSystemList,
          },

          ExternalEnvelopeSubSystem: {
            create: {
              externalWindowToWallRatio:
                createBuildingDto.envelopFacade.externalWindowToWallRatio,
              roofInsulationTypeId:
                createBuildingDto.envelopFacade.externalRoofInsulationTypeId,
              externalGroundInsulationTypeId:
                createBuildingDto.envelopFacade
                  .externalGroundFloorInsulationTypeId,
            },
          },

          SolarPanelSystem: {
            create: solarPanelSystemList,
          },

          PropertyUser: {
            create: {
              userAuthUID: user.uid,
            },
          },
        },
      },
    };

    if (createBuildingDto.coolingSystem.hasCoolingSystem) {
      addingBuildingObject.Property.create = <any>{
        ...addingBuildingObject.Property.create,
        CoolingSystem: {
          create: {
            coolingSystemTypeId:
              createBuildingDto.coolingSystem.coolingSystemTypeId,
            Chiller: {
              create: {
                compressorTypeId:
                  createBuildingDto.coolingSystem.compressorTypeId,
                refrigerantTypeId:
                  createBuildingDto.coolingSystem.refrigerantTypeId,
                chillerEnergySourceTypeId:
                  createBuildingDto.coolingSystem.chillerEnergySourceTypeId,
              },
            },
          },
        },
      };
    }

    if (createBuildingDto.heatingSystem.hasHeatingSystem) {
      addingBuildingObject.Property.create = <any>{
        ...addingBuildingObject.Property.create,
        HeatingSystem: {
          create: {
            heatingSystemTypeId:
              createBuildingDto.heatingSystem.heatingSystemTypeId,
            Heater: {
              create: {
                heaterTypeId: createBuildingDto.heatingSystem.heaterTypeId,
                heaterEnergySourceId:
                  createBuildingDto.heatingSystem.heaterEnergySourceTypeId,
              },
            },
          },
        },
      };
    }

    //console.log(addingBuildingObject);
    //return addingBuildingObject;

    return await this.prismaService.building.create({
      data: addingBuildingObject,
      include: {
        Property: true, // Include all posts in the returned object
      },
    });
    //return 'This action adds a new building';
  }

  async findAll(user: any) {
    // return await this.prismaService.property.findMany({
    //   where: {
    //     statusId: {
    //       equals: 2,
    //     },
    //     PropertyUser: {
    //       userAuthUID : {
    //         equals: ''
    //       }
    //     }
    //   },
    // });
    // console.log(result);
    return await this.prismaService.$queryRaw`
        SELECT p."streetAddress", p.photo, p.id, B.name FROM "Property" p
        INNER JOIN "PropertyUser" PU ON p.id = PU."propertyId"
        INNER JOIN "Building" B on B.id = p."buildingId"
        WHERE "statusId" = 2 AND PU."userAuthUID" = ${user.uid} AND "buildingId" is not null
        ORDER BY p.id DESC`;
  }

  async findOne(id: number) {
    const prop = await this.prismaService.$queryRaw`
        SELECT p.*, B.*, UT.name as "useTypeName",
              SR.name as "sustainabilityRatingName",
              SRS.name as "sustainabilityRatingSchemeName"
        FROM "Property" p
          INNER JOIN "Building" B on B.id = p."buildingId"
          INNER JOIN "UseType" UT on UT.id = p."useTypeId"
          INNER JOIN "SustainabilityRatingScheme" SRS on SRS.id = p."sustainabilityRatingSchemeId"
          INNER JOIN "SustainabilityRating" SR on SR.id = p."sustainabilityRatingId"
        WHERE "statusId" = 2 AND p.id = ${id}`;
    let annualCost = 0;
    let annualConsumption = 0;

    const electricConsumptions =
      await this.prismaService.electricityConsumption.findMany({
        where: {
          propId: {
            equals: id,
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
            equals: id,
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
              equals: id,
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

    // console.log(spaceUsages);

    const heatingSystem = await this.prismaService.heatingSystem.findFirst({
      where: {
        propId: {
          equals: id,
        },
      },
      include: {
        Heater: true,
      },
    });

    const lightingSystems = await this.prismaService.lightingSystem.findMany({
      where: {
        propId: {
          equals: id,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    console.log(heatingSystem);
    console.log(typeof heatingSystem);

    const last12MonthConsumptions = _.take<ElectricityConsumption>(
      electricConsumptions,
      12,
    );

    //console.log(electricConsumptions.length);
    for (let i = 0; i < last12MonthConsumptions.length; i++) {
      annualCost += last12MonthConsumptions[i].monthlyCost;
      annualConsumption += last12MonthConsumptions[i].monthlyValue;

      if (i + 12 < electricConsumptions.length) {
        /// TODO: will remove it, just use it for debugging
        last12MonthConsumptions[i]['sameMonthLastYearValue'] =
          electricConsumptions[i + 12].monthlyValue / 1000;

        last12MonthConsumptions[i]['sameMonthLastYearComparison'] =
          (last12MonthConsumptions[i].monthlyValue -
            electricConsumptions[i + 12].monthlyValue) /
          1000;
      }
    }

    //console.log(electricConsumptions);

    let last24Consumption = 0;
    let periodOf12Month: any = null;
    if (electricConsumptions.length >= 24) {
      for (let i = 12; i < 24; i++) {
        last24Consumption += electricConsumptions[i].monthlyValue;
      }
      periodOf12Month = annualConsumption - last24Consumption;
    }

    const annualCarbonEmissions = annualConsumption * 0.000208;
    let lastMonthComparison = 0;
    if (electricConsumptions.length > 2) {
      lastMonthComparison =
        electricConsumptions[electricConsumptions.length - 1].monthlyValue -
        electricConsumptions[electricConsumptions.length - 2].monthlyValue;
    }

    const totalOperatingHours =
      EnergyConsumptionFormulas.calculateTotalOperatingHours(operationHours);

    const totalFloorArea =
      prop[0].grossInteriorAreaUnit === 'ft2'
        ? Utilities.convertFt2ToM2(prop[0].grossInteriorArea)
        : prop[0].grossInteriorAreaUnit;

    // KWh
    const coolingLoadForSpace =
      BuildingsService.calculateCoolingLoadForGeneralSpace(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
      );

    // KWh
    const heatingLoadForSpace =
      BuildingsService.calculateHeatingLoadForGeneralSpace(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
        heatingSystem,
      );

    // kwh
    const mechanicalVentilationForSpace =
      BuildingsService.calculateMechanicalVentilationForGeneralSpace(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
      );

    const lightingLoadForSpaces =
      BuildingsService.calculateLightingLoadForSpaces(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
        lightingSystems,
      );

    const otherLoadingForSpace =
      annualConsumption -
      (coolingLoadForSpace.coolingLoadForSpace +
        heatingLoadForSpace.heatingLoadForSpace +
        mechanicalVentilationForSpace.annualEnergyUsage +
        lightingLoadForSpaces.lightingEnergyConsumption);

    const breakDownConsumption = BuildingsService.getConsumptionBreakdown(
      coolingLoadForSpace.coolingLoadForSpace,
      heatingLoadForSpace.heatingLoadForSpace,
      mechanicalVentilationForSpace.annualEnergyUsage,
      lightingLoadForSpaces.lightingEnergyConsumption,
      otherLoadingForSpace,
    );

    return {
      annualCost: annualCost,
      annualConsumption: annualConsumption / 1000,
      annualCarbonEmissions: annualCarbonEmissions,
      lastMonthComparison: lastMonthComparison / 1000,
      periodOf12Month: periodOf12Month / 1000,
      totalOperatingHours: totalOperatingHours,
      coolingLoadForSpace: coolingLoadForSpace,
      heatingLoadForSpace: heatingLoadForSpace,
      mechanicalVentilationForSpace: mechanicalVentilationForSpace,
      otherLoadingForSpace: otherLoadingForSpace,
      lightingLoadForSpaces: lightingLoadForSpaces,
      breakDownConsumption: breakDownConsumption,
      prop: prop[0],
      electricConsumptions: _.take<ElectricityConsumption>(
        electricConsumptions,
        24,
      ),
    };
    //return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
