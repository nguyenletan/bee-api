import { Injectable } from '@nestjs/common';
import { format, subDays, subYears } from 'date-fns';

import {
  BuildingDto,
  IBuildingActivity,
  ICoolingSystem,
  ICreateBuildingDto,
  IElectricityConsumption,
  IHeatingSystem,
  ILightingSubSystem,
  ISolarPanelSystem,
  ISpaceUsageGFA,
} from './dto/building.dto';
import { PrismaService } from '../prisma.service';
import {
  AverageOperatingHours,
  ElectricityConsumption,
  ExternalEnvelopeSubSystem,
  LightingSystem,
  Property,
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
// import { EnergyCostFormulas } from '../shared/formulas/energyCostFormulas';
// import { IBreakdownCost } from '../shared/types/iBreakdownCost';
// import { ICO2EmissionBreakdown } from '../shared/types/iCO2EmissionBreakdown';
// import { EnergyCO2EmissionFormulas } from '../shared/formulas/energyCO2EmissionFormulas';
import { PVGISService } from '../shared/externalAPIs/PVGIS.service';
import { PVTechChoices } from '../shared/types/iPVTechChoice';
import { BuildingEnvelopeUValueReferences } from '../shared/reference-tables/buildingEnvelopeUValue.reference';
import { IBuildingEnvelopeDetail } from '../shared/types/iBuildingEnvelopeDetail';
import { BuildingWindowUValuesReferences } from '../shared/reference-tables/buildingWindowUValues.reference';
import { AreaMeasureUnit, LengthMeasureUnit } from '../shared/types/unit';
import { HistorizedPointsService } from '../historized-points/historized-points.service';
import { IEquipmentGroup } from '../shared/types/iEquipmentGroup';
import {
  IElectricConsumptionFromHistorizedLogs,
  IElectricConsumptionFromHistorizedLogsSubSystem,
} from '../shared/types/IElectricConsumptionFromHistorizedLogs';
import { IOverallEnergyConsumptionInformation } from '../shared/types/iOverallEnergyConsumptionInformation';

// import { IEquipmentTypeGroup } from '../shared/types/iEquipmentTypeGroup';

@Injectable()
export class BuildingsService {
  constructor(
    private prismaService: PrismaService,
    private _PVGISService: PVGISService,
    private historizedPointsService: HistorizedPointsService,
  ) {}

  private static calculateAnnualConsumptionOfCoolingSystem(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
  ): ICoolingLoadForGeneralSpace {
    const result: ICoolingLoadForGeneralSpace = {
      coolingLoad: 0,
      coolingLoadForSpace: 0,
      equipmentTypeGroups: null,
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

  private static calculateAnnualConsumptionForHeatingSystem(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
    heatingSystem: any,
  ): IHeatingLoadForGeneralSpace {
    const result: IHeatingLoadForGeneralSpace = {
      heatingLoad: 0,
      heatingLoadForSpace: 0,
      equipmentTypeGroups: null,
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

  private static calculateAnnualConsumptionForLightingSystem(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
    lightingSystems: LightingSystem[],
  ): ILightingLoadForSpace {
    const result: ILightingLoadForSpace = {
      lightingLoad: 0,
      lightingEnergyConsumption: 0,
      equipmentTypeGroups: null,
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

  private static calculateAnnualMechanicalVentilationSystem(
    spaceUsages: SpaceUsage[],
    totalFloorArea: number,
    annualTotalOperatingHours: number,
  ): IMechanicalVentilationForGeneralSpace {
    const result: IMechanicalVentilationForGeneralSpace = {
      airVolumeFlowRate: 0,
      annualEnergyUsage: 0,
      equipmentTypeGroups: null,
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

  private static calculateSubBreakdownForSubSystem(
    total: number,
    equipmentGroups: IEquipmentGroup[],
  ) {
    return equipmentGroups.map((e) => {
      console.log('equipmentId: ');
      console.log(e);
      return {
        id: e.name,
        consumption: e.sum,
        value: +((e.sum * 100) / total).toFixed(0),
        subBreakdown: null,
        equipmentId: e.id,
        color: null,
      };
    });
  }

  private static calculateCoolingConsumptionBreakdown(
    coolingLoadConsumption: ICoolingLoadForGeneralSpace,
  ): IBreakdownConsumption[] {
    return coolingLoadConsumption.equipmentTypeGroups.map((c) => {
      console.log('c');
      console.log(c);
      return {
        id: c.name,
        consumption: c.sum,
        value: +(
          (c.sum * 100) /
          coolingLoadConsumption.coolingLoadForSpace
        ).toFixed(0),
        subBreakdown: BuildingsService.calculateSubBreakdownForSubSystem(
          c.sum,
          c.equipmentGroups,
        ),
        color: null,
      };
    });
  }

  private static calculateHeatingConsumptionBreakdown(
    heatingLoadConsumption: IHeatingLoadForGeneralSpace,
  ): IBreakdownConsumption[] {
    return heatingLoadConsumption.equipmentTypeGroups.map((c) => {
      return {
        id: c.name,
        consumption: c.sum,
        value: +(
          (c.sum * 100) /
          heatingLoadConsumption.heatingLoadForSpace
        ).toFixed(0),
        subBreakdown: BuildingsService.calculateSubBreakdownForSubSystem(
          c.sum,
          c.equipmentGroups,
        ),
        color: null,
      };
    });
  }

  private static calculateMechanicalVentilationConsumptionBreakdown(
    mechanicalVentilationConsumption: IMechanicalVentilationForGeneralSpace,
  ): IBreakdownConsumption[] {
    return mechanicalVentilationConsumption.equipmentTypeGroups.map((c) => {
      return {
        id: c.name,
        consumption: c.sum,
        value: +(
          (c.sum * 100) /
          mechanicalVentilationConsumption.annualEnergyUsage
        ).toFixed(0),
        subBreakdown: BuildingsService.calculateSubBreakdownForSubSystem(
          c.sum,
          c.equipmentGroups,
        ),
        color: null,
      };
    });
  }

  private static calculateConsumptionBreakdown(
    coolingLoadConsumption: ICoolingLoadForGeneralSpace,
    heatingLoadConsumption: IHeatingLoadForGeneralSpace,
    mechanicalVentilationConsumption: IMechanicalVentilationForGeneralSpace,
    lightingLoadConsumption: ILightingLoadForSpace,
    otherConsumption: number,
  ): IBreakdownConsumption[] {
    const total =
      coolingLoadConsumption.coolingLoadForSpace +
      heatingLoadConsumption.heatingLoadForSpace +
      mechanicalVentilationConsumption.annualEnergyUsage +
      lightingLoadConsumption.lightingEnergyConsumption +
      otherConsumption;

    const coolingLoadConsumptionPercentage = +(
      (coolingLoadConsumption.coolingLoadForSpace * 100) /
      total
    ).toFixed(0);

    const heatingLoadConsumptionPercentage = +(
      (heatingLoadConsumption.heatingLoadForSpace * 100) /
      total
    ).toFixed(0);

    const mechanicalVentilationConsumptionPercentage = +(
      (mechanicalVentilationConsumption.annualEnergyUsage * 100) /
      total
    ).toFixed(0);

    const lightingLoadConsumptionPercentage = +(
      (lightingLoadConsumption.lightingEnergyConsumption * 100) /
      total
    ).toFixed(0);

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
        consumption: coolingLoadConsumption.coolingLoadForSpace,
        color: '#636c2e',
        subBreakdown: BuildingsService.calculateCoolingConsumptionBreakdown(
          coolingLoadConsumption,
        ),
      },
      {
        id: 'heating',
        value: heatingLoadConsumptionPercentage,
        consumption: heatingLoadConsumption.heatingLoadForSpace,
        color: '#87972f',
        subBreakdown: BuildingsService.calculateHeatingConsumptionBreakdown(
          heatingLoadConsumption,
        ),
      },
      {
        id: 'lighting',
        value: lightingLoadConsumptionPercentage,
        consumption: heatingLoadConsumption.heatingLoadForSpace,
        color: '#acbf42',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation',
        value: mechanicalVentilationConsumptionPercentage,
        consumption: mechanicalVentilationConsumption.annualEnergyUsage,
        color: '#c1cf74',
        subBreakdown:
          BuildingsService.calculateMechanicalVentilationConsumptionBreakdown(
            mechanicalVentilationConsumption,
          ),
      },
      {
        id: 'others',
        value: otherConsumptionPercentage,
        consumption: otherConsumption,
        color: '#d5dfa3',
        subBreakdown: null,
      },
    ];
  }

  private static async calculateAverageDailyEnergyProductionSolarPVSystem(
    solarPVSystems: SolarPanelSystem[],
    pvgisService: PVGISService,
    prop: Property,
  ): Promise<number> {
    if (solarPVSystems) {
      let result = 0;

      for (const solarPVSystem of solarPVSystems) {
        result +=
          await BuildingsService.calculateAverageDailyEnergyProductionEachSolarPVSystem(
            solarPVSystem,
            pvgisService,
            prop,
          );
      }
      return result;
    }
    return 0;
  }

  private static async calculateAverageDailyEnergyProductionEachSolarPVSystem(
    solarPVSystem: SolarPanelSystem,
    pvgisService: PVGISService,
    prop: Property,
  ): Promise<number> {
    const peakPower = solarPVSystem.installedCapacity;
    const pvTechChoice = PVTechChoices.find(
      (x) => solarPVSystem.pvTechChoiceId === x.id,
    )?.shortName;

    const mountingPlace =
      solarPVSystem.mountingTypeId === 1 ? 'free' : 'building';

    const loss = solarPVSystem.systemLoss;
    const fixed = solarPVSystem.trackingTypeId === 1 ? 1 : 0;
    const angle =
      solarPVSystem.trackingTypeId === 1 ? solarPVSystem.inclineAngle : 0;
    const aspectValue =
      solarPVSystem.trackingTypeId === 1 ? solarPVSystem.orientationAngle : 0;

    const aspect: number | string =
      aspectValue === 0
        ? 'south'
        : aspectValue === 90
        ? 'west'
        : aspectValue === -90
        ? 'east'
        : aspectValue;

    const inclinedAxis = solarPVSystem.inclineAngle ? 1 : 0;

    const inclinedOptimum = solarPVSystem.inclineAngle ?? 0;

    const verticalAxis = solarPVSystem.orientationAngle ? 1 : 0;

    const verticalAxisAngle =
      solarPVSystem.orientationAngle && solarPVSystem.orientationAngle > 0
        ? solarPVSystem.orientationAngle
        : 0;

    const twoAxis =
      solarPVSystem.inclineAngle && solarPVSystem.orientationAngle ? 1 : 0;

    const pvgisData = await pvgisService.callAPI(
      prop.latitude,
      prop.longitude,
      peakPower,
      pvTechChoice,
      mountingPlace,
      loss,
      fixed,
      angle,
      aspectValue,
      inclinedAxis,
      inclinedOptimum,
      verticalAxis,
      verticalAxisAngle,
      twoAxis,
    );
    // t.subscribe({
    //   next(response) {
    //     console.log(response);
    //   },
    //   error(err) {
    //     console.error('Error: ' + err);
    //   },
    //   complete() {
    //     console.log('Completed');
    //   },
    // });

    //console.log(pvgisData);
    if (pvgisData) {
      return pvgisData.averageMonthlyEnergyProduction;
    }
    return 0;
  }

  private static calculateUValue(
    prop: Property,
    externalEnvelopeSubSystem: ExternalEnvelopeSubSystem,
  ): IBuildingEnvelopeDetail {
    if (prop) {
      let year = prop.completionYear + 10;
      if (
        prop.hasMajorRefurbishmentOrExtensionsDone &&
        prop.latestYearForRefurbishmentOrExtension &&
        prop.latestYearForRefurbishmentOrExtension > year
      ) {
        year = prop.latestYearForRefurbishmentOrExtension;
      }

      const uValue = _.findLast(
        BuildingEnvelopeUValueReferences,
        (x) => x.year <= year,
      );

      const buildingWindowUValue = BuildingWindowUValuesReferences.find(
        (x) =>
          (x.id = externalEnvelopeSubSystem.externalWindowInsulationTypeId),
      );

      let windowUValue = null;
      let wallUValue = null;
      let floorUValue = null;
      let roofUValue = null;
      if (uValue) {
        wallUValue = uValue.walls;
        floorUValue = uValue.floors;
      }

      if (buildingWindowUValue) {
        windowUValue = buildingWindowUValue.uValue;
      }

      // console.log('externalEnvelopeSubSystem.roofInsulationTypeId: ');
      // console.log(externalEnvelopeSubSystem.roofInsulationTypeId);
      if (externalEnvelopeSubSystem.roofInsulationTypeId === 1) {
        roofUValue = uValue.pitchedRoof;
      } else if (externalEnvelopeSubSystem.roofInsulationTypeId === 2) {
        roofUValue = uValue.flatRoof;
      }

      return {
        wall: wallUValue,
        floor: floorUValue,
        openings: windowUValue,
        roof: roofUValue,
      };
    }
    return null;
  }

  private calculateConsumptionsFromHistorizedLogsAndGroupBy(
    groupByYear: unknown,
    groupByQuarter: unknown,
    groupByMonth: unknown,
    groupByWeek: unknown,
    groupByDay: unknown,
  ): IElectricConsumptionFromHistorizedLogsSubSystem {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const electricConsumptionGroupByYear = groupByYear.map((x) => {
      return {
        value: +(x.value / 1000).toFixed(2), // convert to mWh
        label: x.year,
        year: x.year,
      };
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const electricConsumptionGroupByQuarter = groupByQuarter.map((x) => {
      return {
        value: +(x.value / 1000).toFixed(2), // convert to mWh
        label: 'Q' + x.quarter + ' ' + x.year,
        year: x.year,
        quarter: x.quarter,
      };
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const electricConsumptionGroupByMonth = groupByMonth.map((x) => {
      return {
        value: +(x.value / 1000).toFixed(2), // convert to mWh
        label: x.month + '/' + x.year,
        year: x.year,
        month: x.month,
      };
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const electricConsumptionGroupByWeek = groupByWeek.map((x) => {
      return {
        value: +(x.value / 1000).toFixed(2), // convert to mWh
        label: 'W' + x.week + ' ' + x.year,
        year: x.year,
        week: x.week,
      };
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const electricConsumptionGroupByDay = groupByDay.map((x) => {
      return {
        value: +(x.value / 1000).toFixed(2),
        label: x.day + '/' + x.month + '/' + x.year,
        year: x.year,
        month: x.month,
        day: x.day,
      };
    });

    return {
      electricConsumptionGroupByYear: electricConsumptionGroupByYear,
      electricConsumptionGroupByQuarter: electricConsumptionGroupByQuarter,
      electricConsumptionGroupByMonth: electricConsumptionGroupByMonth,
      electricConsumptionGroupByWeek: electricConsumptionGroupByWeek,
      electricConsumptionGroupByDay: electricConsumptionGroupByDay,
    };
  }

  private async getListOfElectricConsumptionsFromHistorizedLogs(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<IElectricConsumptionFromHistorizedLogs> {
    const overallGroupByYear =
      await this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByYear(
        propId,
        startDay,
        endDay,
      );

    const overallGroupByQuarter =
      await this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByQuarter(
        propId,
        startDay,
        endDay,
      );

    const overallGroupByMonth =
      await this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByMonth(
        propId,
        startDay,
        endDay,
      );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const overallGroupByWeek =
      await this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByWeek(
        propId,
        startDay,
        endDay,
      );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const overallGroupByDay =
      await this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByDay(
        propId,
        startDay,
        endDay,
      );

    const overall = this.calculateConsumptionsFromHistorizedLogsAndGroupBy(
      overallGroupByYear,
      overallGroupByQuarter,
      overallGroupByMonth,
      overallGroupByWeek,
      overallGroupByDay,
    );

    const coolingGroupByYear =
      await this.historizedPointsService.getCoolingHistorizedPointsByPropertyIdAndGroupByYear(
        propId,
        startDay,
        endDay,
      );

    const coolingGroupByQuarter =
      await this.historizedPointsService.getCoolingHistorizedPointsByPropertyIdAndGroupByQuarter(
        propId,
        startDay,
        endDay,
      );

    const coolingGroupByMonth =
      await this.historizedPointsService.getCoolingHistorizedPointsByPropertyIdAndGroupByMonth(
        propId,
        startDay,
        endDay,
      );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const coolingGroupByWeek =
      await this.historizedPointsService.getCoolingHistorizedPointsByPropertyIdAndGroupByWeek(
        propId,
        startDay,
        endDay,
      );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const coolingGroupByDay =
      await this.historizedPointsService.getCoolingHistorizedPointsByPropertyIdAndGroupByDay(
        propId,
        startDay,
        endDay,
      );

    const cooling = this.calculateConsumptionsFromHistorizedLogsAndGroupBy(
      coolingGroupByYear,
      coolingGroupByQuarter,
      coolingGroupByMonth,
      coolingGroupByWeek,
      coolingGroupByDay,
    );

    return {
      coolingSystem: cooling,
      overall: overall,
    };
  }

  async create(createBuildingDto: BuildingDto, user: any) {
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
              ? Number(item.orientationAngle)
              : null,
        };
      },
    );

    // console.log(
    //   'createBuildingDto.generalBuildingInformation.sustainabilityRatingId: ',
    // );
    // console.log(
    //   createBuildingDto.generalBuildingInformation.sustainabilityRatingId,
    // );

    if (
      createBuildingDto.generalBuildingInformation.sustainabilityRatingId ===
      null
    ) {
      //Empty value
      createBuildingDto.generalBuildingInformation.sustainabilityRatingId = 86;
    }

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
              externalWindowInsulationTypeId:
                createBuildingDto.envelopFacade.externalWindowInsulationTypeId,
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

    return await this.prismaService.building.create({
      data: addingBuildingObject,
    });
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
        SELECT p."streetAddress", p.photo, B.id, B.name, P."streetNumber", P."streetName" 
        FROM "Property" p
          INNER JOIN "PropertyUser" PU ON p.id = PU."propertyId"
          INNER JOIN "Building" B on B.id = p."buildingId"
        WHERE "statusId" = 2 AND PU."userAuthUID" = ${user.uid} AND "buildingId" is not null
        ORDER BY p.id DESC`;
  }

  private static calculateOverallEnergyConsumptionInformation(
    electricConsumptionsFromHistorizedLogs: IElectricConsumptionFromHistorizedLogs,
  ): IOverallEnergyConsumptionInformation {
    let totalEnergyConsumption = 0;
    if (
      electricConsumptionsFromHistorizedLogs &&
      electricConsumptionsFromHistorizedLogs.overall
        .electricConsumptionGroupByMonth.length > 0
    ) {
      totalEnergyConsumption = _.reduce(
        electricConsumptionsFromHistorizedLogs.overall
          .electricConsumptionGroupByYear,
        function (sum, n) {
          return sum + n.value;
        },
        0,
      );
    }
    return {
      totalEnergyConsumption: +totalEnergyConsumption.toFixed(2), // convert to mWh
      totalEnergyCost: +(totalEnergyConsumption * 1000 * 0.23).toFixed(2),
      totalCarbonEmissions: +(totalEnergyConsumption * 1000 * 0.000208).toFixed(
        2,
      ),
    };
  }

  private async calculateFromBuildingInformation(
    prop: any,
    startDay: string,
    endDay: string,
  ) {
    let annualCost = 0;
    let annualConsumption = 0;

    const electricConsumptionsFromHistorizedLogs =
      await this.getListOfElectricConsumptionsFromHistorizedLogs(
        prop[0].propId,
        new Date(startDay),
        new Date(endDay),
      );

    const prev12MonthsEndDay = subDays(new Date(startDay), 1);
    const prev12MonthsStartDay = subYears(new Date(startDay), 1);

    // console.log(prev12MonthsStartDay);
    // console.log(prev12MonthsEndDay);

    const prev12MonthsElectricityConsumptionsFromHistorizedLogs =
      await this.getListOfElectricConsumptionsFromHistorizedLogs(
        prop[0].propId,
        prev12MonthsStartDay,
        prev12MonthsEndDay,
      );

    const prev24MonthsEndDay = subDays(new Date(prev12MonthsStartDay), 1);
    const prev24MonthsStartDay = subYears(new Date(startDay), 2);

    const prev24MonthsElectricityConsumptionsFromHistorizedLogs =
      await this.getListOfElectricConsumptionsFromHistorizedLogs(
        prop[0].propId,
        prev24MonthsStartDay,
        prev24MonthsEndDay,
      );

    const overallEnergyConsumptionInformation =
      BuildingsService.calculateOverallEnergyConsumptionInformation(
        electricConsumptionsFromHistorizedLogs,
      );

    const electricConsumptions =
      await this.prismaService.electricityConsumption.findMany({
        where: {
          propId: {
            equals: prop[0].propId,
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
            equals: prop[0].propId,
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

    const last12MonthConsumptions = _.take<ElectricityConsumption>(
      electricConsumptions,
      12,
    );

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

      if (i + 1 < electricConsumptions.length) {
        /// TODO: will remove it, just use it for debugging
        const lastMonthValue = electricConsumptions[i + 1].monthlyValue;
        last12MonthConsumptions[i]['lastMonthValue'] = lastMonthValue / 1000;

        last12MonthConsumptions[i]['lastMonthComparison'] =
          (last12MonthConsumptions[i].monthlyValue - lastMonthValue) / 1000;
      }
    }

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
        : prop[0].grossInteriorArea;

    const spaceUsages = await this.prismaService.spaceUsage.findMany({
      where: {
        AND: [
          {
            propId: {
              equals: prop[0].propId,
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
    // KWh
    const annualCoolingSystemConsumption =
      BuildingsService.calculateAnnualConsumptionOfCoolingSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
      );
    const sumOfAnnualCoolingSystemConsumption =
      await this.historizedPointsService.sumAllCoolingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    if (sumOfAnnualCoolingSystemConsumption[0].sum) {
      annualCoolingSystemConsumption.coolingLoadForSpace =
        sumOfAnnualCoolingSystemConsumption[0].sum;
    }
    annualCoolingSystemConsumption.equipmentTypeGroups =
      await this.historizedPointsService.getAllEquipmentTypeOfCoolingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    // console.log('annualCoolingSystemConsumption.equipmentTypeGroups');
    // console.log(annualCoolingSystemConsumption.equipmentTypeGroups);

    const heatingSystem = await this.prismaService.heatingSystem.findFirst({
      where: {
        propId: {
          equals: prop[0].propId,
        },
      },
      include: {
        Heater: true,
      },
    });
    // KWh
    const annualHeatingSystemConsumption =
      BuildingsService.calculateAnnualConsumptionForHeatingSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
        heatingSystem,
      );
    const sumOfAnnualHeatingSystemConsumption =
      await this.historizedPointsService.sumAllHeatingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );
    if (sumOfAnnualHeatingSystemConsumption[0].sum) {
      annualHeatingSystemConsumption.heatingLoadForSpace =
        sumOfAnnualHeatingSystemConsumption[0].sum;
    }
    annualHeatingSystemConsumption.equipmentTypeGroups =
      await this.historizedPointsService.getAllEquipmentTypeOfHeatingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    // kwh
    const annualMechanicalVentilationSystemConsumption =
      BuildingsService.calculateAnnualMechanicalVentilationSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
      );
    const sumOfAnnualMechanicalVentilationSystemConsumption =
      await this.historizedPointsService.sumAllMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );
    if (sumOfAnnualMechanicalVentilationSystemConsumption[0].sum) {
      annualMechanicalVentilationSystemConsumption.annualEnergyUsage =
        sumOfAnnualMechanicalVentilationSystemConsumption[0].sum;
    }
    annualMechanicalVentilationSystemConsumption.equipmentTypeGroups =
      await this.historizedPointsService.getAllEquipmentTypeOfMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    const lightingSystems = await this.prismaService.lightingSystem.findMany({
      where: {
        propId: {
          equals: prop[0].propId,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    // kwh
    const annualLightingConsumption =
      BuildingsService.calculateAnnualConsumptionForLightingSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
        lightingSystems,
      );

    const sumOfAnnualLightingSystemConsumption =
      await this.historizedPointsService.sumAllLightingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    if (sumOfAnnualLightingSystemConsumption[0].sum) {
      annualLightingConsumption.lightingEnergyConsumption =
        sumOfAnnualLightingSystemConsumption[0].sum;
    }

    // kwh
    const annualOtherSystemConsumption =
      annualConsumption -
      (annualCoolingSystemConsumption.coolingLoadForSpace +
        annualHeatingSystemConsumption.heatingLoadForSpace +
        annualMechanicalVentilationSystemConsumption.annualEnergyUsage +
        annualLightingConsumption.lightingEnergyConsumption);

    // console.log('annualCoolingSystemConsumption');
    // console.log(annualCoolingSystemConsumption);

    const consumptionBreakdown = BuildingsService.calculateConsumptionBreakdown(
      annualCoolingSystemConsumption,
      annualHeatingSystemConsumption,
      annualMechanicalVentilationSystemConsumption,
      annualLightingConsumption,
      annualOtherSystemConsumption,
    );

    const solarPVSystems = await this.prismaService.solarPanelSystem.findMany({
      where: {
        propId: {
          equals: prop[0].propId,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    const pvSolarSystemLoad =
      await BuildingsService.calculateAverageDailyEnergyProductionSolarPVSystem(
        solarPVSystems,
        this._PVGISService,
        prop[0],
      );

    const externalEnvelopeSubSystem =
      await this.prismaService.externalEnvelopeSubSystem.findFirst({
        where: {
          propId: {
            equals: prop[0].propId,
          },
        },
      });
    const incidentalGainsOtherInformation = BuildingsService.calculateUValue(
      prop[0],
      externalEnvelopeSubSystem,
    );

    //const pvgisData = await this._PVGISService.callAPI();
    // t.subscribe({
    //   next(response) {
    //     console.log(response);
    //   },
    //   error(err) {
    //     console.error('Error: ' + err);
    //   },
    //   complete() {
    //     console.log('Completed');
    //   },
    // });
    //console.log(pvgisData);

    return {
      overallEnergyConsumptionInformation: overallEnergyConsumptionInformation,
      annualCost: annualCost,
      annualConsumption: annualConsumption / 1000,
      annualCarbonEmissions: annualCarbonEmissions,
      lastMonthComparison: lastMonthComparison / 1000,
      periodOf12Month: periodOf12Month / 1000,
      totalOperatingHours: totalOperatingHours,
      annualCoolingSystemConsumption: annualCoolingSystemConsumption,
      annualHeatingSystemConsumption: annualHeatingSystemConsumption,
      annualLightingConsumption: annualLightingConsumption,
      annualMechanicalVentilationSystemConsumption:
        annualMechanicalVentilationSystemConsumption,
      annualOtherSystemConsumption: annualOtherSystemConsumption,
      pvSolarSystemLoad: pvSolarSystemLoad,
      consumptionBreakdown: consumptionBreakdown,
      incidentalGainsOtherInformation: incidentalGainsOtherInformation,
      prop: prop[0],
      electricConsumptionsFromHistorizedLogs:
        electricConsumptionsFromHistorizedLogs,
      prev12MonthsElectricityConsumptionsFromHistorizedLogs:
        prev12MonthsElectricityConsumptionsFromHistorizedLogs,
      prev24MonthsElectricityConsumptionsFromHistorizedLogs:
        prev24MonthsElectricityConsumptionsFromHistorizedLogs,
      electricConsumptions: _.take<ElectricityConsumption>(
        electricConsumptions,
        24,
      ),
    };
  }

  public async calculateBreakdownByTime(
    id: number,
    startDay: string,
    endDay: string,
  ) {
    // console.log('calculateBreakdownByTime');
    // console.log(startDay);
    // console.log(endDay);
    const prop = await this.prismaService.$queryRaw`
        SELECT p.*, B.*, p.id as "propId"
        FROM "Property" p
          INNER JOIN "Building" B on B.id = p."buildingId"
        WHERE "statusId" = 2 AND B.id = ${id}`;

    const coolingSystemConsumption: ICoolingLoadForGeneralSpace = {
      coolingLoad: 0,
      coolingLoadForSpace: 0,
      equipmentTypeGroups: null,
    };

    const sumOfCoolingSystemConsumption =
      await this.historizedPointsService.sumAllCoolingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );
    if (sumOfCoolingSystemConsumption[0].sum) {
      coolingSystemConsumption.coolingLoadForSpace =
        sumOfCoolingSystemConsumption[0].sum;
    }
    coolingSystemConsumption.equipmentTypeGroups =
      await this.historizedPointsService.getAllEquipmentTypeOfCoolingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    const heatingSystemConsumption: IHeatingLoadForGeneralSpace = {
      heatingLoad: 0,
      heatingLoadForSpace: 0,
      equipmentTypeGroups: null,
    };
    const sumOfHeatingSystemConsumption =
      await this.historizedPointsService.sumAllHeatingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );
    if (sumOfHeatingSystemConsumption[0].sum) {
      heatingSystemConsumption.heatingLoadForSpace =
        sumOfHeatingSystemConsumption[0].sum;
    }
    heatingSystemConsumption.equipmentTypeGroups =
      await this.historizedPointsService.getAllEquipmentTypeOfHeatingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    const mechanicalVentilationSystemConsumption: IMechanicalVentilationForGeneralSpace =
      {
        airVolumeFlowRate: 0,
        annualEnergyUsage: 0,
        equipmentTypeGroups: null,
      };
    const sumOfMechanicalVentilationSystemConsumption =
      await this.historizedPointsService.sumAllMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );
    if (sumOfMechanicalVentilationSystemConsumption[0].sum) {
      mechanicalVentilationSystemConsumption.annualEnergyUsage =
        sumOfMechanicalVentilationSystemConsumption[0].sum;
    }
    mechanicalVentilationSystemConsumption.equipmentTypeGroups =
      await this.historizedPointsService.getAllEquipmentTypeOfMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );

    const lightingConsumption: ILightingLoadForSpace = {
      lightingLoad: 0,
      lightingEnergyConsumption: 0,
      equipmentTypeGroups: null,
    };

    const sumOfLightingSystemConsumption =
      await this.historizedPointsService.sumAllLightingHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId as number,
        new Date(startDay),
        new Date(endDay),
      );
    if (sumOfLightingSystemConsumption[0].sum) {
      lightingConsumption.lightingEnergyConsumption =
        sumOfLightingSystemConsumption[0].sum;
    }

    const tmp =
      await this.historizedPointsService.sumAllOverallHistorizedPointsByPropertyIdAndDateRange(
        prop[0].propId,
        new Date(startDay),
        new Date(endDay),
      );

    const overallElectricConsumption = tmp[0].sum;

    console.log('overallElectricConsumption');
    console.log(overallElectricConsumption);

    const overallOtherSystemConsumption =
      overallElectricConsumption -
      (coolingSystemConsumption.coolingLoadForSpace +
        heatingSystemConsumption.heatingLoadForSpace +
        mechanicalVentilationSystemConsumption.annualEnergyUsage +
        lightingConsumption.lightingEnergyConsumption);

    const consumptionBreakdown = BuildingsService.calculateConsumptionBreakdown(
      coolingSystemConsumption,
      heatingSystemConsumption,
      mechanicalVentilationSystemConsumption,
      lightingConsumption,
      overallOtherSystemConsumption,
    );

    // const overallCost = overallElectricConsumption * 0.23;
    // const overallCarbonEmissions = overallElectricConsumption * 0.000208;

    return {
      consumptionBreakdown: consumptionBreakdown,
      overallOtherSystemConsumption: overallOtherSystemConsumption,
      heatingSystemConsumption: heatingSystemConsumption,
      coolingSystemConsumption: coolingSystemConsumption,
      lightingConsumption: lightingConsumption,
      mechanicalVentilationSystemConsumption:
        mechanicalVentilationSystemConsumption,
    };
  }

  private async findOneByTime(
    id: number,
    prop: any,
    groupBy: string,
    startDay: string,
    endDay: string,
  ): Promise<IBreakdownConsumption[]> {
    let overallElectricConsumption,
      coolingElectricConsumption,
      heatingElectricConsumption,
      lightingElectricConsumption,
      mechanicalVentilationElectricConsumption = 0;

    switch (groupBy) {
      case 'month':
      default:
        overallElectricConsumption =
          await this.historizedPointsService.sumAllOverallHistorizedPointsByPropertyIdAndDateRange(
            prop.propId,
            new Date(startDay),
            new Date(endDay),
          );

        coolingElectricConsumption =
          await this.historizedPointsService.sumAllCoolingHistorizedPointsByPropertyIdAndDateRange(
            prop.propId,
            new Date(startDay),
            new Date(endDay),
          );

        heatingElectricConsumption =
          await this.historizedPointsService.sumAllHeatingHistorizedPointsByPropertyIdAndDateRange(
            prop.propId,
            new Date(startDay),
            new Date(endDay),
          );

        lightingElectricConsumption =
          await this.historizedPointsService.sumAllLightingHistorizedPointsByPropertyIdAndDateRange(
            prop.propId,
            new Date(startDay),
            new Date(endDay),
          );

        mechanicalVentilationElectricConsumption =
          await this.historizedPointsService.sumAllMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
            prop.propId,
            new Date(startDay),
            new Date(endDay),
          );

        break;
    }

    // const otherElectricConsumption =
    //   overallElectricConsumption -
    //   (coolingElectricConsumption +
    //     heatingElectricConsumption +
    //     lightingElectricConsumption +
    //     mechanicalVentilationElectricConsumption);

    const percentageOfCoolingElectricConsumption = +(
      (coolingElectricConsumption * 100) /
      overallElectricConsumption
    ).toFixed(0);
    const percentageOfHeatingElectricConsumption = +(
      (coolingElectricConsumption * 100) /
      overallElectricConsumption
    ).toFixed(0);
    const percentageOfLightingElectricConsumption =
      +(lightingElectricConsumption * 100) /
      overallElectricConsumption.toFixed(0);
    const percentageOfMechanicalVenlitlationElectricConsumption = +(
      (mechanicalVentilationElectricConsumption * 100) /
      overallElectricConsumption
    ).toFixed(0);
    // const percentageOfOtherElectricConsumption =
    //   100 -
    //   percentageOfCoolingElectricConsumption +
    //   percentageOfHeatingElectricConsumption +
    //   percentageOfMechanicalVenlitlationElectricConsumption +
    //   percentageOfLightingElectricConsumption;

    return [
      {
        id: 'cooling',
        value: percentageOfCoolingElectricConsumption,
        consumption: coolingElectricConsumption,
        color: null,
        subBreakdown: BuildingsService.calculateCoolingConsumptionBreakdown(
          coolingElectricConsumption,
        ),
      },
      {
        id: 'heating',
        value: percentageOfHeatingElectricConsumption,
        consumption: heatingElectricConsumption,
        color: null,
        subBreakdown: null,
      },
      {
        id: 'lighting',
        value: percentageOfLightingElectricConsumption,
        consumption: lightingElectricConsumption,
        color: null,
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation',
        value: percentageOfMechanicalVenlitlationElectricConsumption,
        consumption: mechanicalVentilationElectricConsumption,
        color: null,
        subBreakdown: null,
      },
    ];
  }

  async findOne(id: number, startDay: string, endDay: string) {
    const prop = await this.prismaService.$queryRaw`
        SELECT p.*, B.*, p.id as "propId", UT.name as "useTypeName",
              SR.name as "sustainabilityRatingName",
              SRS.name as "sustainabilityRatingSchemeName",
              U.email
        FROM "Property" p
          INNER JOIN "Building" B on B.id = p."buildingId"
          INNER JOIN "UseType" UT on UT.id = p."useTypeId"
          INNER JOIN "SustainabilityRatingScheme" SRS on SRS.id = p."sustainabilityRatingSchemeId"
          LEFT OUTER JOIN "SustainabilityRating" SR on SR.id = p."sustainabilityRatingId"
          INNER JOIN "User" U on U."externalUID" = p."editedBy"
        WHERE "statusId" = 2 AND B.id = ${id}`;

    return this.calculateFromBuildingInformation(prop, startDay, endDay);
  }

  async findOneForEditing(id: number): Promise<ICreateBuildingDto> {
    const prop = await this.prismaService.$queryRaw`
        SELECT p.*, B.*, p.id as "propId", UT.name as "useTypeName",
              SR.name as "sustainabilityRatingName",
              SRS.name as "sustainabilityRatingSchemeName"
        FROM "Property" p
          INNER JOIN "Building" B on B.id = p."buildingId"
          INNER JOIN "UseType" UT on UT.id = p."useTypeId"
          INNER JOIN "SustainabilityRatingScheme" SRS on SRS.id = p."sustainabilityRatingSchemeId"
          LEFT OUTER JOIN "SustainabilityRating" SR on SR.id = p."sustainabilityRatingId"
       WHERE "statusId" = 2 AND B.id = ${id}`;

    const building = await this.prismaService.building.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        Property: {
          include: {
            AverageOperatingHours: true,
            SpaceUsage: true,
            ElectricityConsumption: true,
            CoolingSystem: {
              include: {
                Chiller: true,
              },
            },
            HeatingSystem: {
              include: {
                Heater: true,
              },
            },
            LightingSystem: true,
            ExternalEnvelopeSubSystem: true,
            SolarPanelSystem: true,
          },
        },
      },
    });

    // console.log(building.Property[0]?.AverageOperatingHours);

    const buildingActivity: IBuildingActivity[] = [
      {
        id: 1,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Sunday',
        codeName: 'sunday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.sundayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.sundayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.sundayStart !== null,
      },
      {
        id: 2,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Monday',
        codeName: 'monday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.mondayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.mondayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.mondayStart !== null,
      },
      {
        id: 3,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Tuesday',
        codeName: 'tuesday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.tuesdayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.tuesdayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.tuesdayStart !== null,
      },
      {
        id: 4,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Wednesday',
        codeName: 'wednesday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.wednesdayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.wednesdayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.wednesdayStart !==
          null,
      },
      {
        id: 5,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Thursday',
        codeName: 'thursday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.thursdayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.thursdayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.thursdayStart !==
          null,
      },
      {
        id: 6,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Friday',
        codeName: 'friday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.fridayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.fridayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.fridayStart !== null,
      },
      {
        id: 7,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Saturday',
        codeName: 'saturday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.saturdayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.saturdayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.saturdayStart !==
          null,
      },
      {
        id: 8,
        averageOperatingHoursId:
          building.Property[0]?.AverageOperatingHours[0].id,
        name: 'Public Holiday',
        codeName: 'publicHoliday',
        startTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.publicHolidayStart}`,
        ),
        endTime: new Date(
          `2021-01-01T${building.Property[0]?.AverageOperatingHours[0]?.publicHolidayEnd}`,
        ),
        isEnable:
          building.Property[0]?.AverageOperatingHours[0]?.publicHolidayStart !==
          null,
      },
    ];

    const spaceUsageGFAList: ISpaceUsageGFA[] =
      building.Property[0]?.SpaceUsage?.map<ISpaceUsageGFA>(
        (spaceUsage: SpaceUsage) => {
          return {
            id: spaceUsage.id,
            title: spaceUsage.title,
            typeId: spaceUsage.usageTypeId,
            percentage: spaceUsage.usagePercentage,
            climateControlId: spaceUsage.climateControlId,
            fanTypeId: spaceUsage.fanTypeId,
            hasReheatRecovery: spaceUsage.hasReheatRecovery,
          };
        },
      );

    const electricityConsumptions: IElectricityConsumption[] =
      building.Property[0]?.ElectricityConsumption?.map<IElectricityConsumption>(
        (electricConsumption: ElectricityConsumption) => {
          return {
            id: electricConsumption.id,
            month: electricConsumption.month,
            year: electricConsumption.year,
            value: electricConsumption.monthlyValue,
            cost: electricConsumption.monthlyCost,
          };
        },
      );

    //console.log(electricityConsumptions);

    const lightingSubSystemList: ILightingSubSystem[] =
      building.Property[0]?.LightingSystem?.map<ILightingSubSystem>(
        (lightingSubSystem: LightingSystem) => {
          return {
            id: lightingSubSystem.id,
            title: 'title ' + lightingSubSystem.id,
            indoorLightingSystemTypeId: lightingSubSystem.lightingFittingTypeId,
            percentage: lightingSubSystem.percentageOfFittingTypeUsed,
          };
        },
      );

    const solarPanelSystemList: ISolarPanelSystem[] =
      building.Property[0]?.SolarPanelSystem.map<ISolarPanelSystem>(
        (solarPanelSystem: SolarPanelSystem) => {
          return {
            id: solarPanelSystem.id,
            title: 'SolarPanelSystem ' + solarPanelSystem.id,
            orientationAngle: solarPanelSystem.orientationAngle,
            systemLoss: solarPanelSystem.systemLoss,
            trackingTypeId: solarPanelSystem.trackingTypeId,
            mountingTypeId: solarPanelSystem.mountingTypeId,
            pvTechChoiceId: solarPanelSystem.pvTechChoiceId,
            installedCapacity: solarPanelSystem.installedCapacity,
            inclineAngel: solarPanelSystem.inclineAngle,
          };
        },
      );

    // console.log(building.Property[0]?.CoolingSystem[0]);
    let coolingSystem: ICoolingSystem;
    if (building.Property[0]?.CoolingSystem[0] !== undefined) {
      coolingSystem = {
        id: building.Property[0]?.CoolingSystem[0]?.id,
        chillerId: building.Property[0]?.CoolingSystem[0]?.Chiller[0]?.id,
        hasCoolingSystem: building.Property[0]?.CoolingSystem[0] !== undefined,
        coolingSystemTypeId:
          building.Property[0]?.CoolingSystem[0]?.coolingSystemTypeId,
        chillerEnergySourceTypeId:
          building.Property[0]?.CoolingSystem[0]?.Chiller[0]
            ?.chillerEnergySourceTypeId,
        compressorTypeId:
          building.Property[0]?.CoolingSystem[0]?.Chiller[0]?.compressorTypeId,
        refrigerantTypeId:
          building.Property[0]?.CoolingSystem[0]?.Chiller[0]?.refrigerantTypeId,
      };
    }

    let heatingSystem: IHeatingSystem;
    if (building.Property[0]?.HeatingSystem[0] !== undefined) {
      heatingSystem = {
        id: building.Property[0]?.HeatingSystem[0]?.id,
        heaterId: building.Property[0]?.HeatingSystem[0]?.Heater[0]?.id,
        hasHeatingSystem: building.Property[0]?.HeatingSystem[0] !== undefined,
        heatingSystemTypeId:
          building.Property[0]?.HeatingSystem[0]?.heatingSystemTypeId,
        heaterEnergySourceTypeId:
          building.Property[0]?.HeatingSystem[0]?.Heater[0]
            ?.heaterEnergySourceId,
        heaterTypeId:
          building.Property[0]?.HeatingSystem[0]?.Heater[0]?.heaterTypeId,
      };
    }

    return {
      buildingActivity: buildingActivity,
      spaceUsageGFAList: spaceUsageGFAList,
      coolingSystem: coolingSystem,
      heatingSystem: heatingSystem,
      lightingSubSystemList: lightingSubSystemList,
      electricityConsumptionList: electricityConsumptions,
      envelopFacade: {
        id: building.Property[0]?.ExternalEnvelopeSubSystem[0]?.id,
        externalWindowInsulationTypeId:
          building.Property[0]?.ExternalEnvelopeSubSystem[0]
            ?.externalWindowInsulationTypeId,
        externalWindowToWallRatio:
          building.Property[0]?.ExternalEnvelopeSubSystem[0]
            ?.externalWindowToWallRatio,
        externalGroundFloorInsulationTypeId:
          building.Property[0]?.ExternalEnvelopeSubSystem[0]
            ?.floorInsulationTypeId,
        externalRoofInsulationTypeId:
          building.Property[0]?.ExternalEnvelopeSubSystem[0]
            ?.roofInsulationTypeId,
        externalWallInsulationTypeId:
          building.Property[0]?.ExternalEnvelopeSubSystem[0]
            ?.externalWallInsulationTypeId,
      },
      solarPanelSystemList: solarPanelSystemList,
      generalBuildingInformation: {
        id: id,
        propId: prop[0].propId,
        buildingName: building.name,
        streetName: building.Property[0].streetName,
        streetNumber: building.Property[0].streetNumber,
        address: building.Property[0].streetAddress,
        city: building.Property[0].city,
        state: building.Property[0].state,
        countryCode: building.Property[0].countryCode,
        postalCode: building.Property[0].postCode,
        suburb: null,
        location: {
          lat: parseFloat(building.Property[0].latitude.toString()),
          lng: parseFloat(building.Property[0].longitude.toString()),
        },
        storeysAboveGround: building.storeysAboveGround,
        storeysBelowGround: building.storeysBelowGround,
        grossInteriorArea: building.Property[0].grossInteriorArea,
        grossInteriorAreaUnit:
          building.Property[0].grossInteriorAreaUnit === 'm2'
            ? AreaMeasureUnit.SquareMetre
            : AreaMeasureUnit.SquareFeet,
        netUsableArea: building.Property[0].netUsableArea,
        netUsableAreaUnit:
          building.Property[0].netUsableAreaUnit === 'm2'
            ? AreaMeasureUnit.SquareMetre
            : AreaMeasureUnit.SquareFeet,
        avgInternalFloorToCeilingHeight:
          building.averageInternalFloorToCeilingHeight,
        avgInternalFloorToCeilingHeightUnit:
          building.averageInternalFloorToCeilingHeightUnit === 'm'
            ? LengthMeasureUnit.Metre
            : LengthMeasureUnit.Feet,
        buildingOrientedId: building.buildingMajorOrientationId,
        constructionPeriodValue: building.Property[0].completionYear,
        sustainabilityRatingSchemeId:
          building.Property[0].sustainabilityRatingSchemeId,
        sustainabilityRatingId: building.Property[0].sustainabilityRatingId,
        useTypeId: building.Property[0].useTypeId,
        buildingPhoto: building.Property[0].photo,
        hasMajorRefurbishmentOrExtensionsDone:
          building.Property[0].hasMajorRefurbishmentOrExtensionsDone,
        latestYearForRefurbishmentOrExtension:
          building.Property[0].latestYearForRefurbishmentOrExtension,
      },
    };
  }

  async update(id: number, updateBuildingDto: BuildingDto) {
    //console.log(updateBuildingDto);

    const averageOperatingHours: AverageOperatingHours = <
      AverageOperatingHours
    >{};

    for (const item of updateBuildingDto?.buildingActivity) {
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

    // console.log(averageOperatingHours);

    await this.prismaService.averageOperatingHours.update({
      where: {
        id: updateBuildingDto.buildingActivity[0].averageOperatingHoursId,
      },
      data: averageOperatingHours,
    });

    for (const item of updateBuildingDto?.spaceUsageGFAList) {
      const spaceUsage = {
        usageTypeId: item.typeId,
        usagePercentage: item.percentage,
        climateControlId: item.climateControlId,
        title: item.title,
        fanTypeId: item.fanTypeId,
        hasReheatRecovery: item.hasReheatRecovery,
      };
      //console.log(item);
      await this.prismaService.spaceUsage.upsert({
        where: {
          id: item.id,
        },
        update: spaceUsage,
        create: {
          ...spaceUsage,
          propId: updateBuildingDto.generalBuildingInformation.propId,
        },
      });
    }

    for (const item of updateBuildingDto?.electricityConsumptionList) {
      const electricityConsumption = {
        month: item.month,
        year: item.year,
        monthlyValue: Number(item.value),
        monthlyCost: Number(item.cost),
      };

      // console.log(item);
      await this.prismaService.electricityConsumption.upsert({
        where: {
          id: item.id,
        },
        update: electricityConsumption,
        create: {
          ...electricityConsumption,
          propId: updateBuildingDto.generalBuildingInformation.propId,
        },
      });
    }

    // console.log(updateBuildingDto.coolingSystem);
    // console.log(updateBuildingDto.heatingSystem);

    if (updateBuildingDto.coolingSystem?.hasCoolingSystem === true) {
      if (updateBuildingDto.coolingSystem?.id !== undefined) {
        console.log('update');
        await this.prismaService.coolingSystem.update({
          where: {
            id: updateBuildingDto.coolingSystem?.id,
          },
          data: {
            coolingSystemTypeId:
              updateBuildingDto.coolingSystem?.coolingSystemTypeId,
            Chiller: {
              update: {
                where: {
                  id: updateBuildingDto.coolingSystem?.chillerId,
                },
                data: {
                  compressorTypeId:
                    updateBuildingDto.coolingSystem?.compressorTypeId,
                  refrigerantTypeId:
                    updateBuildingDto.coolingSystem.refrigerantTypeId,
                  chillerEnergySourceTypeId:
                    updateBuildingDto.coolingSystem.chillerEnergySourceTypeId,
                },
              },
            },
          },
        });
      } else {
        console.log('create');
        await this.prismaService.coolingSystem.create({
          data: {
            coolingSystemTypeId:
              updateBuildingDto.coolingSystem?.coolingSystemTypeId,
            propId: updateBuildingDto.generalBuildingInformation.propId,
            Chiller: {
              create: {
                compressorTypeId:
                  updateBuildingDto.coolingSystem?.compressorTypeId,
                refrigerantTypeId:
                  updateBuildingDto.coolingSystem.refrigerantTypeId,
                chillerEnergySourceTypeId:
                  updateBuildingDto.coolingSystem.chillerEnergySourceTypeId,
              },
            },
          },
        });
      }
    } else {
      if (updateBuildingDto.coolingSystem?.id !== undefined) {
        console.log('delete');
        await this.prismaService.coolingSystem.delete({
          where: {
            id: updateBuildingDto.coolingSystem?.id,
          },
        });
      }
    }

    if (updateBuildingDto.heatingSystem.hasHeatingSystem === true) {
      if (updateBuildingDto.heatingSystem?.id !== undefined) {
        console.log('update heating');
        await this.prismaService.heatingSystem.update({
          where: {
            id: updateBuildingDto.heatingSystem?.id,
          },
          data: {
            heatingSystemTypeId:
              updateBuildingDto.heatingSystem?.heatingSystemTypeId,
            Heater: {
              update: {
                where: {
                  id: updateBuildingDto.heatingSystem?.heaterId,
                },
                data: {
                  heaterTypeId: updateBuildingDto.heatingSystem.heaterTypeId,
                  heaterEnergySourceId:
                    updateBuildingDto.heatingSystem.heaterEnergySourceTypeId,
                },
              },
            },
          },
        });
      } else {
        console.log('create heating');
        await this.prismaService.heatingSystem.create({
          data: {
            heatingSystemTypeId:
              updateBuildingDto.heatingSystem?.heatingSystemTypeId,
            propId: updateBuildingDto.generalBuildingInformation.propId,
            Heater: {
              create: {
                heaterTypeId: updateBuildingDto.heatingSystem.heaterTypeId,
                heaterEnergySourceId:
                  updateBuildingDto.heatingSystem.heaterEnergySourceTypeId,
              },
            },
          },
        });
      }
    } else {
      if (updateBuildingDto.heatingSystem?.id !== undefined) {
        console.log('delete heating');
        await this.prismaService.heatingSystem.delete({
          where: {
            id: updateBuildingDto.heatingSystem?.id,
          },
        });
      }
    }

    for (const item of updateBuildingDto?.lightingSubSystemList) {
      const lightingSystem = {
        lightingFittingTypeId: item.indoorLightingSystemTypeId,
        percentageOfFittingTypeUsed: Number(item.percentage),
      };
      console.log(item);
      await this.prismaService.lightingSystem.upsert({
        where: {
          id: item.id,
        },
        update: lightingSystem,
        create: {
          ...lightingSystem,
          propId: updateBuildingDto.generalBuildingInformation.propId,
        },
      });
    }

    await this.prismaService.externalEnvelopeSubSystem.update({
      where: {
        id: updateBuildingDto.envelopFacade?.id,
      },
      data: {
        externalWindowToWallRatio:
          updateBuildingDto.envelopFacade?.externalWindowToWallRatio,
        externalWindowInsulationTypeId:
          updateBuildingDto.envelopFacade?.externalWindowInsulationTypeId,
        roofInsulationTypeId:
          updateBuildingDto.envelopFacade?.externalRoofInsulationTypeId,
        externalGroundInsulationTypeId:
          updateBuildingDto.envelopFacade?.externalGroundFloorInsulationTypeId,
      },
    });

    for (const item of updateBuildingDto?.solarPanelSystemList) {
      const solarPanelSystem = {
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
            ? Number(item.orientationAngle)
            : null,
      };

      console.log(solarPanelSystem);

      this.prismaService.solarPanelSystem.upsert({
        where: {
          id: item.id,
        },
        update: solarPanelSystem,
        create: {
          ...solarPanelSystem,
          propId: updateBuildingDto.generalBuildingInformation.propId,
        },
      });
    }

    // const solarPanelSystemList = updateBuildingDto?.solarPanelSystemList.map(
    //   (item: ISolarPanelSystem) => {
    //     return <SolarPanelSystem>{
    //       systemLoss: item.systemLoss,
    //       installedCapacity: Number(item.installedCapacity),
    //       pvTechChoiceId: item.pvTechChoiceId,
    //       inclineAngle:
    //         item.trackingTypeId === 1 || item.trackingTypeId === 2
    //           ? item.inclineAngel
    //           : null,
    //       trackingTypeId: item.trackingTypeId,
    //       mountingTypeId: item.mountingTypeId,
    //       orientationAngle:
    //         item.trackingTypeId === 1 || item.trackingTypeId === 3
    //           ? Number(item.orientationAngle)
    //           : null,
    //     };
    //   },
    // );

    return await this.prismaService.building.update({
      data: {
        name: updateBuildingDto.generalBuildingInformation.buildingName,

        storeysBelowGround: Number(
          updateBuildingDto.generalBuildingInformation.storeysBelowGround,
        ),

        storeysAboveGround: Number(
          updateBuildingDto.generalBuildingInformation.storeysAboveGround,
        ),

        numberOfFloorAboveGroundLvl: 0,

        numberOfFloorBelowGroundLvl: 0,

        buildingMajorOrientationId: 1,

        averageInternalFloorToCeilingHeight: Number(
          updateBuildingDto.generalBuildingInformation
            .avgInternalFloorToCeilingHeight,
        ),

        averageInternalFloorToCeilingHeightUnit:
          updateBuildingDto.generalBuildingInformation
            .avgInternalFloorToCeilingHeightUnit,

        Property: {
          update: {
            data: {
              streetAddress:
                updateBuildingDto.generalBuildingInformation.streetNumber +
                ' ' +
                updateBuildingDto.generalBuildingInformation.streetNumber,
              streetName:
                updateBuildingDto.generalBuildingInformation.streetName,
              streetNumber:
                updateBuildingDto.generalBuildingInformation.streetNumber,

              postCode: updateBuildingDto.generalBuildingInformation.postalCode,

              state: updateBuildingDto.generalBuildingInformation.state,

              city: updateBuildingDto.generalBuildingInformation.city,

              countryCode:
                updateBuildingDto.generalBuildingInformation.countryCode,

              grossFloorArea: 0,

              grossInteriorArea: Number(
                updateBuildingDto.generalBuildingInformation.grossInteriorArea,
              ),

              grossInteriorAreaUnit:
                updateBuildingDto.generalBuildingInformation
                  .grossInteriorAreaUnit,

              netUsableArea: Number(
                updateBuildingDto.generalBuildingInformation.netUsableArea,
              ),

              netUsableAreaUnit:
                updateBuildingDto.generalBuildingInformation.netUsableAreaUnit,

              latitude:
                updateBuildingDto.generalBuildingInformation.location?.lat,

              longitude:
                updateBuildingDto.generalBuildingInformation.location?.lng,

              majorOrientationId:
                updateBuildingDto.generalBuildingInformation.buildingOrientedId,

              completionYear: Number(
                updateBuildingDto.generalBuildingInformation
                  .constructionPeriodValue,
              ),

              sustainabilityRatingSchemeId: Number(
                updateBuildingDto.generalBuildingInformation
                  .sustainabilityRatingSchemeId,
              ),

              sustainabilityRatingId: Number(
                updateBuildingDto.generalBuildingInformation
                  .sustainabilityRatingId,
              ),

              useTypeId: Number(
                updateBuildingDto.generalBuildingInformation.useTypeId,
              ),

              //photo: updateBuildingDto.generalBuildingInformation.buildingPhoto,

              hasMajorRefurbishmentOrExtensionsDone:
                updateBuildingDto.generalBuildingInformation
                  .hasMajorRefurbishmentOrExtensionsDone,

              latestYearForRefurbishmentOrExtension:
                updateBuildingDto.generalBuildingInformation
                  .latestYearForRefurbishmentOrExtension,
            },
            where: {
              id: updateBuildingDto.generalBuildingInformation.propId,
            },
          },
        },
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
