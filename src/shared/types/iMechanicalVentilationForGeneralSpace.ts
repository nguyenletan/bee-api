import { IEquipmentTypeGroup } from './iEquipmentTypeGroup';

export interface IMechanicalVentilationForGeneralSpace {
  airVolumeFlowRate: number;
  annualEnergyUsage: number;
  equipmentTypeGroups: IEquipmentTypeGroup[] | null;
}
