import { SpaceUsage, HeatingSystem } from '@prisma/client';
import { SpaceUsageActivityDetails } from './reference-tables/spaceUsageActivityDetails';
import { CorrespondingEfficiencyRatios } from './reference-tables/correspondingEfficiencyRatio';
import { ICoolingLoadForGeneralSpace } from './types/coolingLoadForGeneralSpace';
import { IHeatingLoadForGeneralSpace } from './types/heatingLoadForGeneralSpace';

export class Formulas {
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
              percentageOfTotalInternalFloorArea *
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

      console.log(heatingSystem.Heater);

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
                percentageOfTotalInternalFloorArea *
                annualTotalOperatingHours) /
              (1000 * efficiencyRatioOfCooledOrBoth),
          };
        }
      }
    }
    return null;
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
}
