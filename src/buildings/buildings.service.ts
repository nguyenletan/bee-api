import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

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
import { EnergyCostFormulas } from '../shared/formulas/energyCostFormulas';
import { IBreakdownCost } from '../shared/types/iBreakdownCost';
import { ICO2EmissionBreakdown } from '../shared/types/iCO2EmissionBreakdown';
import { EnergyCO2EmissionFormulas } from '../shared/formulas/energyCO2EmissionFormulas';
import { PVGISService } from '../shared/externalAPIs/PVGIS.service';
import { PVTechChoices } from '../shared/types/iPVTechChoice';
import { BuildingEnvelopeUValueReferences } from '../shared/reference-tables/buildingEnvelopeUValue.reference';
import { IBuildingEnvelopeDetail } from '../shared/types/iBuildingEnvelopeDetail';
import { BuildingWindowUValuesReferences } from '../shared/reference-tables/buildingWindowUValues.reference';
import { AreaMeasureUnit, LengthMeasureUnit } from '../shared/types/unit';

@Injectable()
export class BuildingsService {
  constructor(
    private prismaService: PrismaService,
    private _PVGISService: PVGISService,
  ) {}

  private static calculateAnnualConsumptionOfCoolingSystem(
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

  private static calculateAnnualConsumptionForHeatingSystem(
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

  private static calculateAnnualConsumptionForLightingSystem(
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

  private static calculateAnnualMechanicalVentilationSystem(
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

  private static calculateCostBreakdown(
    annualTotalEnergyCost: number,
    annualTotalEnergyConsumption: number,
    annualHeatingSystemConsumption: number,
    annualCoolingSystemConsumption: number,
    annualLightingSystemConsumption: number,
    annualMechanicalVentilationSystemConsumption: number,
  ): IBreakdownCost[] {
    const annualHeatingSystemCost =
      EnergyCostFormulas.calculateEnergyCostForEachSubSystem(
        annualTotalEnergyCost,
        annualTotalEnergyConsumption,
        annualHeatingSystemConsumption,
      );

    const annualHeatingSystemCostPercentage = +(
      (annualHeatingSystemCost * 100) /
      annualTotalEnergyCost
    ).toFixed(0);

    const annualCoolingSystemCost =
      EnergyCostFormulas.calculateEnergyCostForEachSubSystem(
        annualTotalEnergyCost,
        annualTotalEnergyConsumption,
        annualCoolingSystemConsumption,
      );

    const annualCoolingSystemCostPercentage = +(
      (annualCoolingSystemCost * 100) /
      annualTotalEnergyCost
    ).toFixed(0);

    const annualLightingSystemConst =
      EnergyCostFormulas.calculateEnergyCostForEachSubSystem(
        annualTotalEnergyCost,
        annualTotalEnergyConsumption,
        annualLightingSystemConsumption,
      );

    const annualLightingSystemCostPercentage = +(
      (annualLightingSystemConst * 100) /
      annualTotalEnergyCost
    ).toFixed(0);

    const annualMechanicalVentilationSystemCost =
      EnergyCostFormulas.calculateEnergyCostForEachSubSystem(
        annualTotalEnergyCost,
        annualTotalEnergyConsumption,
        annualMechanicalVentilationSystemConsumption,
      );

    const annualMechanicalVentilationSystemCostPercentage = +(
      (annualMechanicalVentilationSystemCost * 100) /
      annualTotalEnergyCost
    ).toFixed(0);

    const annualOtherSystemCostPercentage =
      100 -
      (annualHeatingSystemCostPercentage +
        annualCoolingSystemCostPercentage +
        annualLightingSystemCostPercentage +
        annualMechanicalVentilationSystemCostPercentage);

    const subOther = [
      { id: 'other1', value: 15, color: '#FFAA00', subBreakdown: null },
      { id: 'other2', value: 39, color: '#FFB700', subBreakdown: null },
      { id: 'other4', value: 28, color: '#FFC300', subBreakdown: null },
      { id: 'other5', value: 11, color: '#FFD000', subBreakdown: null },
      { id: 'other6', value: 8, color: '#FFEA00', subBreakdown: null },
    ];

    const subLighting = [
      { id: 'lighting1', value: 22, color: '#7251B5', subBreakdown: null },
      { id: 'lighting2', value: 12, color: '#9163CB', subBreakdown: null },
      { id: 'lighting3', value: 39, color: '#B185DB', subBreakdown: null },
      { id: 'lighting4', value: 16, color: '#D2B7E5', subBreakdown: null },
      { id: 'lighting5', value: 10, color: '#DEC9E9', subBreakdown: null },
    ];

    const subHeating = [
      { id: 'heating1', value: 20, color: '#590D22', subBreakdown: null },
      { id: 'heating2', value: 19, color: '#A4133C', subBreakdown: null },
      { id: 'heating3', value: 37, color: '#FF4D6D', subBreakdown: null },
      { id: 'heating4', value: 16, color: '#FF8FA3', subBreakdown: null },
      { id: 'heating5', value: 9, color: '#FFCCD5', subBreakdown: null },
    ];

    const subCooling = [
      { id: 'cooling1', value: 10, color: '#012A4A', subBreakdown: null },
      { id: 'cooling2', value: 20, color: '#01497C', subBreakdown: null },
      { id: 'cooling3', value: 36, color: '#2A6F97', subBreakdown: null },
      { id: 'cooling4', value: 16, color: '#468FAF', subBreakdown: null },
      { id: 'cooling5', value: 19, color: '#A9D6E5', subBreakdown: null },
    ];

    const subMechanicalVentilation = [
      {
        id: 'mechanical ventilation 1',
        value: 12,
        color: '#07BEB8',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 2',
        value: 22,
        color: '#3DCCC7',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 3',
        value: 29,
        color: '#68D8D6',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 4',
        value: 26,
        color: '#9CEAEF',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 5',
        value: 10,
        color: '#C4FFF9',
        subBreakdown: null,
      },
    ];

    return [
      {
        id: 'cooling',
        value: annualCoolingSystemCostPercentage,
        color: '#636c2e',
        subBreakdown: subCooling,
      },
      {
        id: 'heating',
        value: annualHeatingSystemCostPercentage,
        color: '#87972f',
        subBreakdown: subHeating,
      },
      {
        id: 'lighting',
        value: annualLightingSystemCostPercentage,
        color: '#acbf42',
        subBreakdown: subLighting,
      },
      {
        id: 'mechanical ventilation',
        value: annualMechanicalVentilationSystemCostPercentage,
        color: '#c1cf74',
        subBreakdown: subMechanicalVentilation,
      },
      {
        id: 'others',
        value: annualOtherSystemCostPercentage,
        color: '#d5dfa3',
        subBreakdown: subOther,
      },
    ];
  }

  private static calculateConsumptionBreakdown(
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
    ).toFixed(0);

    const heatingLoadConsumptionPercentage = +(
      (heatingLoadConsumption * 100) /
      total
    ).toFixed(0);

    const mechanicalVentilationConsumptionPercentage = +(
      (mechanicalVentilationConsumption * 100) /
      total
    ).toFixed(0);

    const lightingLoadConsumptionPercentage = +(
      (lightingLoadConsumption * 100) /
      total
    ).toFixed(0);

    const otherConsumptionPercentage =
      100 -
      (coolingLoadConsumptionPercentage +
        heatingLoadConsumptionPercentage +
        mechanicalVentilationConsumptionPercentage +
        lightingLoadConsumptionPercentage);

    const subOther = [
      { id: 'other1', value: 15, color: '#FFAA00', subBreakdown: null },
      { id: 'other2', value: 39, color: '#FFB700', subBreakdown: null },
      { id: 'other4', value: 28, color: '#FFC300', subBreakdown: null },
      { id: 'other5', value: 11, color: '#FFD000', subBreakdown: null },
      { id: 'other6', value: 8, color: '#FFEA00', subBreakdown: null },
    ];

    const subLighting = [
      { id: 'lighting1', value: 22, color: '#7251B5', subBreakdown: null },
      { id: 'lighting2', value: 12, color: '#9163CB', subBreakdown: null },
      { id: 'lighting3', value: 39, color: '#B185DB', subBreakdown: null },
      { id: 'lighting4', value: 16, color: '#D2B7E5', subBreakdown: null },
      { id: 'lighting5', value: 10, color: '#DEC9E9', subBreakdown: null },
    ];

    const subHeating = [
      { id: 'heating1', value: 20, color: '#590D22', subBreakdown: null },
      { id: 'heating2', value: 19, color: '#A4133C', subBreakdown: null },
      { id: 'heating3', value: 37, color: '#FF4D6D', subBreakdown: null },
      { id: 'heating4', value: 16, color: '#FF8FA3', subBreakdown: null },
      { id: 'heating5', value: 9, color: '#FFCCD5', subBreakdown: null },
    ];

    const subCooling = [
      { id: 'cooling1', value: 10, color: '#012A4A', subBreakdown: null },
      { id: 'cooling2', value: 20, color: '#01497C', subBreakdown: null },
      { id: 'cooling3', value: 36, color: '#2A6F97', subBreakdown: null },
      { id: 'cooling4', value: 16, color: '#468FAF', subBreakdown: null },
      { id: 'cooling5', value: 19, color: '#A9D6E5', subBreakdown: null },
    ];

    const subMechanicalVentilation = [
      {
        id: 'mechanical ventilation 1',
        value: 12,
        color: '#07BEB8',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 2',
        value: 22,
        color: '#3DCCC7',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 3',
        value: 29,
        color: '#68D8D6',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 4',
        value: 26,
        color: '#9CEAEF',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 5',
        value: 10,
        color: '#C4FFF9',
        subBreakdown: null,
      },
    ];

    return [
      {
        id: 'cooling',
        value: coolingLoadConsumptionPercentage,
        color: '#636c2e',
        subBreakdown: subCooling,
      },
      {
        id: 'heating',
        value: heatingLoadConsumptionPercentage,
        color: '#87972f',
        subBreakdown: subHeating,
      },
      {
        id: 'lighting',
        value: lightingLoadConsumptionPercentage,
        color: '#acbf42',
        subBreakdown: subLighting,
      },
      {
        id: 'mechanical ventilation',
        value: mechanicalVentilationConsumptionPercentage,
        color: '#c1cf74',
        subBreakdown: subMechanicalVentilation,
      },
      {
        id: 'others',
        value: otherConsumptionPercentage,
        color: '#d5dfa3',
        subBreakdown: subOther,
      },
    ];
  }

  private static calculateCO2EmissionsBreakdown(
    countryCode: string,
    annualTotalCO2Emissions: number,
    annualHeatingSystemConsumption: number,
    annualCoolingSystemConsumption: number,
    annualLightingSystemConsumption: number,
    annualMechanicalVentilationSystemConsumption: number,
  ): ICO2EmissionBreakdown[] {
    const annualHeatingSystemCO2Emissions =
      EnergyCO2EmissionFormulas.calculateC02EmissionForEachSystem(
        annualHeatingSystemConsumption,
        countryCode,
      );

    const annualHeatingSystemCO2EmissionsPercentage = +(
      (annualHeatingSystemCO2Emissions * 100) /
      annualTotalCO2Emissions
    ).toFixed(0);

    const annualCoolingSystemCO2Emissions =
      EnergyCO2EmissionFormulas.calculateC02EmissionForEachSystem(
        annualCoolingSystemConsumption,
        countryCode,
      );

    const annualCoolingSystemCO2EmissionsPercentage = +(
      (annualCoolingSystemCO2Emissions * 100) /
      annualTotalCO2Emissions
    ).toFixed(0);

    const annualLightingSystemCO2Emissions =
      EnergyCO2EmissionFormulas.calculateC02EmissionForEachSystem(
        annualLightingSystemConsumption,
        countryCode,
      );

    const annualLightingSystemCO2EmissionsPercentage = +(
      (annualLightingSystemCO2Emissions * 100) /
      annualTotalCO2Emissions
    ).toFixed(0);

    const annualMechanicalVentilationSystemCO2Emissions =
      EnergyCO2EmissionFormulas.calculateC02EmissionForEachSystem(
        annualMechanicalVentilationSystemConsumption,
        countryCode,
      );

    const annualMechanicalVentilationSystemCO2EmissionsPercentage = +(
      (annualMechanicalVentilationSystemCO2Emissions * 100) /
      annualTotalCO2Emissions
    ).toFixed(0);

    const annualOtherSystemCO2EmissionsPercentage =
      100 -
      (annualHeatingSystemCO2EmissionsPercentage +
        annualCoolingSystemCO2EmissionsPercentage +
        annualLightingSystemCO2EmissionsPercentage +
        annualMechanicalVentilationSystemCO2EmissionsPercentage);

    const subOther = [
      { id: 'other1', value: 15, color: '#FFAA00', subBreakdown: null },
      { id: 'other2', value: 39, color: '#FFB700', subBreakdown: null },
      { id: 'other4', value: 28, color: '#FFC300', subBreakdown: null },
      { id: 'other5', value: 11, color: '#FFD000', subBreakdown: null },
      { id: 'other6', value: 8, color: '#FFEA00', subBreakdown: null },
    ];

    const subLighting = [
      { id: 'lighting1', value: 22, color: '#7251B5', subBreakdown: null },
      { id: 'lighting2', value: 12, color: '#9163CB', subBreakdown: null },
      { id: 'lighting3', value: 39, color: '#B185DB', subBreakdown: null },
      { id: 'lighting4', value: 16, color: '#D2B7E5', subBreakdown: null },
      { id: 'lighting5', value: 10, color: '#DEC9E9', subBreakdown: null },
    ];

    const subHeating = [
      { id: 'heating1', value: 20, color: '#590D22', subBreakdown: null },
      { id: 'heating2', value: 19, color: '#A4133C', subBreakdown: null },
      { id: 'heating3', value: 37, color: '#FF4D6D', subBreakdown: null },
      { id: 'heating4', value: 16, color: '#FF8FA3', subBreakdown: null },
      { id: 'heating5', value: 9, color: '#FFCCD5', subBreakdown: null },
    ];

    const subCooling = [
      { id: 'cooling1', value: 10, color: '#012A4A', subBreakdown: null },
      { id: 'cooling2', value: 20, color: '#01497C', subBreakdown: null },
      { id: 'cooling3', value: 36, color: '#2A6F97', subBreakdown: null },
      { id: 'cooling4', value: 16, color: '#468FAF', subBreakdown: null },
      { id: 'cooling5', value: 19, color: '#A9D6E5', subBreakdown: null },
    ];

    const subMechanicalVentilation = [
      {
        id: 'mechanical ventilation 1',
        value: 12,
        color: '#07BEB8',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 2',
        value: 22,
        color: '#3DCCC7',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 3',
        value: 29,
        color: '#68D8D6',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 4',
        value: 26,
        color: '#9CEAEF',
        subBreakdown: null,
      },
      {
        id: 'mechanical ventilation 5',
        value: 10,
        color: '#C4FFF9',
        subBreakdown: null,
      },
    ];

    return [
      {
        id: 'cooling',
        value: annualCoolingSystemCO2EmissionsPercentage,
        color: '#636c2e',
        subBreakdown: subCooling,
      },
      {
        id: 'heating',
        value: annualHeatingSystemCO2EmissionsPercentage,
        color: '#87972f',
        subBreakdown: subHeating,
      },
      {
        id: 'lighting',
        value: annualLightingSystemCO2EmissionsPercentage,
        color: '#acbf42',
        subBreakdown: subLighting,
      },
      {
        id: 'mechanical ventilation',
        value: annualMechanicalVentilationSystemCO2EmissionsPercentage,
        color: '#c1cf74',
        subBreakdown: subMechanicalVentilation,
      },
      {
        id: 'others',
        value: annualOtherSystemCO2EmissionsPercentage,
        color: '#d5dfa3',
        subBreakdown: subOther,
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

      console.log('externalEnvelopeSubSystem.roofInsulationTypeId: ');
      console.log(externalEnvelopeSubSystem.roofInsulationTypeId);
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
        SELECT p."streetAddress", p.photo, B.id, B.name FROM "Property" p
        INNER JOIN "PropertyUser" PU ON p.id = PU."propertyId"
        INNER JOIN "Building" B on B.id = p."buildingId"
        WHERE "statusId" = 2 AND PU."userAuthUID" = ${user.uid} AND "buildingId" is not null
        ORDER BY p.id DESC`;
  }

  async findOne(id: number) {
    const prop = await this.prismaService.$queryRaw`
        SELECT p.*, B.*, p.id as "propId", UT.name as "useTypeName",
              SR.name as "sustainabilityRatingName",
              SRS.name as "sustainabilityRatingSchemeName"
        FROM "Property" p
          INNER JOIN "Building" B on B.id = p."buildingId"
          INNER JOIN "UseType" UT on UT.id = p."useTypeId"
          INNER JOIN "SustainabilityRatingScheme" SRS on SRS.id = p."sustainabilityRatingSchemeId"
          INNER JOIN "SustainabilityRating" SR on SR.id = p."sustainabilityRatingId"
        WHERE "statusId" = 2 AND B.id = ${id}`;
    let annualCost = 0;
    let annualConsumption = 0;

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

    console.log(prop[0]);

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

    // console.log(spaceUsages);

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

    const externalEnvelopeSubSystem =
      await this.prismaService.externalEnvelopeSubSystem.findFirst({
        where: {
          propId: {
            equals: prop[0].propId,
          },
        },
      });

    // console.log('externalEnvelopeSubSystem: ');
    // console.log(externalEnvelopeSubSystem);

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

      if (i + 1 < electricConsumptions.length) {
        /// TODO: will remove it, just use it for debugging
        const lastMonthValue = electricConsumptions[i + 1].monthlyValue;
        last12MonthConsumptions[i]['lastMonthValue'] = lastMonthValue / 1000;

        last12MonthConsumptions[i]['lastMonthComparison'] =
          (last12MonthConsumptions[i].monthlyValue - lastMonthValue) / 1000;
      }
    }

    // console.log(last12MonthConsumptions[0]);
    // console.log(last12MonthConsumptions[1]);

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

    // KWh
    const annualCoolingSystemConsumption =
      BuildingsService.calculateAnnualConsumptionOfCoolingSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
      );

    // KWh
    const annualHeatingSystemConsumption =
      BuildingsService.calculateAnnualConsumptionForHeatingSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
        heatingSystem,
      );

    // kwh
    const annualMechanicalVentilationSystemConsumption =
      BuildingsService.calculateAnnualMechanicalVentilationSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
      );

    // kwh
    const annualLightingConsumption =
      BuildingsService.calculateAnnualConsumptionForLightingSystem(
        spaceUsages,
        totalFloorArea,
        totalOperatingHours,
        lightingSystems,
      );

    // kwh
    const annualOtherSystemConsumption =
      annualConsumption -
      (annualCoolingSystemConsumption.coolingLoadForSpace +
        annualHeatingSystemConsumption.heatingLoadForSpace +
        annualMechanicalVentilationSystemConsumption.annualEnergyUsage +
        annualLightingConsumption.lightingEnergyConsumption);

    const consumptionBreakdown = BuildingsService.calculateConsumptionBreakdown(
      annualCoolingSystemConsumption.coolingLoadForSpace,
      annualHeatingSystemConsumption.heatingLoadForSpace,
      annualMechanicalVentilationSystemConsumption.annualEnergyUsage,
      annualLightingConsumption.lightingEnergyConsumption,
      annualOtherSystemConsumption,
    );

    const costBreakdown = BuildingsService.calculateCostBreakdown(
      annualCost,
      annualConsumption,
      annualHeatingSystemConsumption.heatingLoadForSpace,
      annualCoolingSystemConsumption.coolingLoadForSpace,
      annualLightingConsumption.lightingEnergyConsumption,
      annualMechanicalVentilationSystemConsumption.annualEnergyUsage,
    );

    const co2EmissionsBreakdown =
      BuildingsService.calculateCO2EmissionsBreakdown(
        prop[0].countryCode,
        annualCarbonEmissions,
        annualHeatingSystemConsumption.heatingLoadForSpace,
        annualCoolingSystemConsumption.coolingLoadForSpace,
        annualLightingConsumption.lightingEnergyConsumption,
        annualMechanicalVentilationSystemConsumption.annualEnergyUsage,
      );

    const pvSolarSystemLoad =
      await BuildingsService.calculateAverageDailyEnergyProductionSolarPVSystem(
        solarPVSystems,
        this._PVGISService,
        prop[0],
      );

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
      costBreakdown: costBreakdown,
      co2EmissionsBreakdown: co2EmissionsBreakdown,
      incidentalGainsOtherInformation: incidentalGainsOtherInformation,
      prop: prop[0],
      electricConsumptions: _.take<ElectricityConsumption>(
        electricConsumptions,
        24,
      ),
    };
    //return `This action returns a #${id} building`;
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
          INNER JOIN "SustainabilityRating" SR on SR.id = p."sustainabilityRatingId"
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
                updateBuildingDto.generalBuildingInformation.address,

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
