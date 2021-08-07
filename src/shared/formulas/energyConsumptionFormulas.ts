import { SpaceUsage, HeatingSystem } from '@prisma/client';
import { SpaceUsageActivityDetails } from '../reference-tables/spaceUsageActivityDetails';
import { CorrespondingEfficiencyRatios } from '../reference-tables/correspondingEfficiencyRatio';
import { ICoolingLoadForGeneralSpace } from '../types/coolingLoadForGeneralSpace';
import { IHeatingLoadForGeneralSpace } from '../types/heatingLoadForGeneralSpace';
import { IMechanicalVentilationForGeneralSpace } from '../types/iMechanicalVentilationForGeneralSpace';
import { MechanicalVentilationSpecificFanPowers } from '../reference-tables/mechanicalVentilation';

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
      const spaceUsageActivityDetail = SpaceUsageActivityDetails.find(
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
      const spaceUsageActivityDetail = SpaceUsageActivityDetails.find(
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
      const spaceUsageActivityDetail = SpaceUsageActivityDetails.find(
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
  // [Annual Total Operating Hours] / 1000000
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
      };
    }

    return null;
  }

  // // Annual Energy Usage for Mechanical Ventilation System (kWh) =
  // // SUM([Annual Energy Usage for each Mechanically Ventilated Space])
  // static calculateAnnualEnergyUsageForMechanicalVentilationSystem(): number {
  //
  //   return 0;
  // }
}
