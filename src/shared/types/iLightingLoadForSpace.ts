import { IEquipmentTypeGroup } from './iEquipmentTypeGroup';

export interface ILightingLoadForSpace {
  // W/m2
  lightingLoad: number;

  // kWh
  lightingEnergyConsumption: number;

  equipmentTypeGroups: IEquipmentTypeGroup[] | null;
}
