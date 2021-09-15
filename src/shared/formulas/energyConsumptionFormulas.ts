import {
  SpaceUsage,
  LightingSystem,
  AverageOperatingHours,
} from '@prisma/client';
import { SpaceUsageActivityDetailReference } from '../reference-tables/spaceUsageActivityDetail.reference';
import { CorrespondingEfficiencyRatios } from '../reference-tables/correspondingEfficiencyRatio.reference';
import { ICoolingLoadForGeneralSpace } from '../types/iCoolingLoadForGeneralSpace';
import { IHeatingLoadForGeneralSpace } from '../types/iHeatingLoadForGeneralSpace';
import { IMechanicalVentilationForGeneralSpace } from '../types/iMechanicalVentilationForGeneralSpace';
import { MechanicalVentilationSpecificFanPowers } from '../reference-tables/mechanicalVentilation.reference';
import { LightFittingEfficacyReference } from '../reference-tables/lightFittingEfficacy.reference';
import { Utilities } from '../utilities';

export class EnergyConsumptionFormulas {
  // Cooling Load for Space (kWh) = [Space Cooling Load] * [Total Floor Area (Internal)] * [% of Total Floor Area (Internal)]
  // * [Annual Total Operating Hours] / (1000 * [Efficiency Ratio of (Cooled/Both)])
  static calculateCoolingLoadForGeneralSpace(
    spaceUsage: SpaceUsage,
    totalInternalFloorArea: number,
    percentageOfTotalInternalFloorArea: number,
    annualTotalOperatingHours: number,
  ): ICoolingLoadForGeneralSpace {
    if (spaceUsage) {
      const correspondingEfficiencyRatio = CorrespondingEfficiencyRatios.find(
        (x) => x.id === spaceUsage.climateControlId,
      );

      const efficiencyRatioOfCooledOrBoth = correspondingEfficiencyRatio
        ? correspondingEfficiencyRatio.cooling
        : 0;

      const spaceCoolingLoad = this.calculateCoolingLoad(spaceUsage);

      if (
        efficiencyRatioOfCooledOrBoth &&
        efficiencyRatioOfCooledOrBoth !== 0
      ) {
        return <ICoolingLoadForGeneralSpace>{
          coolingLoad: spaceCoolingLoad,
          coolingLoadForSpace:
            (spaceCoolingLoad *
              totalInternalFloorArea *
              (percentageOfTotalInternalFloorArea / 100) *
              annualTotalOperatingHours) /
            (1000 * efficiencyRatioOfCooledOrBoth),
        };
      }
    }
    return null;
  }

  // Cooling Load = (OCCUPANCY_DENS * METABOLIC_RATE) + EQUIPMENT_W_M2 + Heat Gain from Lighting + External Heat Gain + OTHER_GAINS_W_M2
  static calculateCoolingLoad(spaceUsage: SpaceUsage): number {
    if (spaceUsage) {
      const spaceUsageActivityDetail = SpaceUsageActivityDetailReference.find(
        (x) => x.id === spaceUsage.usageTypeId,
      );

      if (spaceUsageActivityDetail) {
        return (
          spaceUsageActivityDetail.occupancyDens *
            spaceUsageActivityDetail.metabolicRate +
          spaceUsageActivityDetail.equipmentWM2 +
          spaceUsageActivityDetail.heatGainFromLighting +
          spaceUsageActivityDetail.externalHeatGain +
          spaceUsageActivityDetail.otherGainsWM2
        );
      }
    }
    return 0;
  }

  // Heating Load = Heating Load (W/m2)
  static calculateHeatingLoad(spaceUsage: SpaceUsage): number {
    if (spaceUsage) {
      const spaceUsageActivityDetail = SpaceUsageActivityDetailReference.find(
        (x) => x.id === spaceUsage.usageTypeId,
      );

      if (spaceUsageActivityDetail) {
        return spaceUsageActivityDetail.heatingLoad;
      }
    }
    return 0;
  }

  // Heating Load for Space (kWh) =  [Space Heating Load]
  // * [Total Floor Area (Internal)] * [% of Total Floor Area (Internal)]
  // * [Annual Total Operating Hours] /
  // (1000 * [Efficiency Ratio of (Heated/Both) where Heating System Type is
  // (Air Source Heat Pump/Electric Resistance Heater/Ground Source Heat Pump)])
  static calculateHeatingLoadForGeneralSpace(
    spaceUsage: SpaceUsage,
    totalInternalFloorArea: number,
    percentageOfTotalInternalFloorArea: number,
    annualTotalOperatingHours: number,
    heatingSystem: any,
  ): IHeatingLoadForGeneralSpace {
    if (spaceUsage) {
      const correspondingEfficiencyRatio = CorrespondingEfficiencyRatios.find(
        (x) => x.id === spaceUsage.climateControlId,
      );

      const efficiencyRatioOfCooledOrBoth = correspondingEfficiencyRatio
        ? correspondingEfficiencyRatio.heating
        : 0;

      const spaceHeatingLoad = this.calculateHeatingLoad(spaceUsage);

      if (
        efficiencyRatioOfCooledOrBoth &&
        efficiencyRatioOfCooledOrBoth !== 0
      ) {
        if (
          heatingSystem.Heater[0].heaterTypeId === 1 ||
          heatingSystem.Heater[0].heaterTypeId === 2 ||
          heatingSystem.Heater[0].heaterTypeId === 6
        ) {
          console.log(heatingSystem.Heater[0]);

          return <IHeatingLoadForGeneralSpace>{
            heatingLoad: spaceHeatingLoad,
            heatingLoadForSpace:
              (spaceHeatingLoad *
                totalInternalFloorArea *
                (percentageOfTotalInternalFloorArea / 100) *
                annualTotalOperatingHours) /
              (1000 * efficiencyRatioOfCooledOrBoth),
          };
        }
      }
    }
    return null;
  }

  // Air Volume Flow Rate for each Mechanically Ventilated Space (L/s) =
  // [Air Change Rate for Activity] * [Occupancy Density] *
  // [Total Floor Area (Internal)] * [% of Total Floor Area (Internal)]
  // Air Change Rate for Activity = OA_FLOW_PERSON
  static calculateAirVolumeFlowRateForEachMechanicallyVentilatedSpace(
    spaceUsage: SpaceUsage,
    totalFloorArea: number,
  ): number {
    if (spaceUsage) {
      const spaceUsageActivityDetail = SpaceUsageActivityDetailReference.find(
        (x) => x.id === spaceUsage.usageTypeId,
      );

      if (spaceUsageActivityDetail) {
        return (
          spaceUsageActivityDetail.oaFlowPerson *
          spaceUsageActivityDetail.occupancyDens *
          totalFloorArea *
          (spaceUsage.usagePercentage / 100)
        );
      }
    }
    return 0;
  }

  // Annual Energy Usage for each Mechanically Ventilated Space (kWh) =
  // [Air Volume Flow Rate for each Mechanically Ventilated Space] *
  // [Specific Fan Power of (Fan System Type)] *
  // [Annual Total Operating Hours] / 1000
  static calculateAnnualEnergyUsageForEachMechanicallyVentilatedSpace(
    spaceUsage: SpaceUsage,
    totalFloorArea: number,
    annualTotalOperatingHours: number,
  ): IMechanicalVentilationForGeneralSpace {
    if (spaceUsage) {
      const airVolumeFlowRate =
        this.calculateAirVolumeFlowRateForEachMechanicallyVentilatedSpace(
          spaceUsage,
          totalFloorArea,
        );

      const specificFanPowerItem = MechanicalVentilationSpecificFanPowers.find(
        (x) =>
          x.fanTypeId === spaceUsage.fanTypeId &&
          x.hasHeatRecovery === spaceUsage.hasReheatRecovery,
      );
      const specificFanPower = specificFanPowerItem
        ? specificFanPowerItem.specificFanPower
        : 1;

      return {
        airVolumeFlowRate: airVolumeFlowRate,
        annualEnergyUsage:
          (airVolumeFlowRate * specificFanPower * annualTotalOperatingHours) /
          1000000,
        equipmentTypeGroups: null,
      };
    }

    return null;
  }

  // Overall Lighting Efficacy (lm/W) = ([%LED Usage] * [LED Efficacy RoT]) +
  // ([%Compact Fluorescent Tube Usage] * [Compact Fluorescent Tube Efficacy RoT])
  // + ([%Fluorescent T5 Tube Usage] * [Fluorescent T5 Tube Efficacy RoT]) +
  // ([%Fluorescent T8 Tube Usage] * [Fluorescent T8 Tube Efficacy RoT]) +
  // ([%Fluorescent T12 Tube Usage] * [Fluorescent T12 Tube Efficacy RoT])
  static calculateOverallLightingEfficacy(
    lightingSystems: LightingSystem[],
  ): number {
    let result = 0;
    if (lightingSystems) {
      for (const lightingSystem of lightingSystems) {
        const lightFittingEfficacy = LightFittingEfficacyReference.find(
          (x) => x.id === lightingSystem.lightingFittingTypeId,
        );
        if (lightFittingEfficacy) {
          //const ledEfficacyRoT = lightFittingEfficacy.efficacy;
          result +=
            (lightingSystem.percentageOfFittingTypeUsed / 100) *
            lightFittingEfficacy.efficacy;
        }
      }
      //const result = lightingSystem.percentageOfFittingTypeUsed;
    }
    return result;
  }

  // Lighting Load = LIGHTING_LUX (lm/m2)
  // Lighting Load for Space (lm) = [Space Lighting Load RoT] *
  // [Total Floor Area (Internal)] * [% of Total Floor Area (Internal)]
  static calculateLightingLoadForSpace(
    spaceUsage: SpaceUsage,
    totalFloorArea,
  ): number {
    if (spaceUsage) {
      const spaceUsageActivityDetail = SpaceUsageActivityDetailReference.find(
        (x) => x.id === spaceUsage.usageTypeId,
      );
      if (spaceUsageActivityDetail) {
        return (
          spaceUsageActivityDetail.lightingLux *
          (totalFloorArea * (spaceUsage.usagePercentage / 100))
        );
      }
    }
    return 0;
  }

  // Lighting Energy Use for Space (W) = Lighting Load for Space (lm) / [Overall Lighting Efficacy (lm/W)]
  static calculateLightingEnergyUseForSpace(
    spaceUsage: SpaceUsage,
    totalFloorArea,
    lightingSystems: LightingSystem[],
  ): number {
    if (spaceUsage && lightingSystems) {
      return (
        this.calculateLightingLoadForSpace(spaceUsage, totalFloorArea) /
        this.calculateOverallLightingEfficacy(lightingSystems)
      );
    }
    return 0;
  }

  public static calculateTotalOperatingHours(
    operationHours: AverageOperatingHours,
  ): number {
    const mondayHours = Utilities.subtractTime(
      operationHours.mondayEnd,
      operationHours.mondayStart,
    );

    const tuesdayHours = Utilities.subtractTime(
      operationHours.tuesdayEnd,
      operationHours.tuesdayStart,
    );

    const wednesdayHours = Utilities.subtractTime(
      operationHours.wednesdayEnd,
      operationHours.wednesdayStart,
    );

    const thursdayHours = Utilities.subtractTime(
      operationHours.thursdayEnd,
      operationHours.thursdayStart,
    );

    const fridayHours = Utilities.subtractTime(
      operationHours.fridayEnd,
      operationHours.fridayStart,
    );

    const saturdayHours = Utilities.subtractTime(
      operationHours.saturdayEnd,
      operationHours.saturdayStart,
    );

    const sundayHours = Utilities.subtractTime(
      operationHours.sundayEnd,
      operationHours.saturdayStart,
    );

    ///TODO: we will calculate it late
    // const publicHoliday = this.subtractTime(
    //   operationHours.publicHolidayEnd,
    //   operationHours.publicHolidayStart,
    // );

    return (
      ((mondayHours +
        tuesdayHours +
        wednesdayHours +
        thursdayHours +
        fridayHours +
        saturdayHours +
        sundayHours) *
        52.1428571) /
      60
    );
  }
}
