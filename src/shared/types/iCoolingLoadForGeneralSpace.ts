import { IEquipmentTypeGroup } from './iEquipmentTypeGroup';

export interface ICoolingLoadForGeneralSpace {
  coolingLoad: number;
  coolingLoadForSpace: number;
  equipmentTypeGroups: IEquipmentTypeGroup[] | null;
}
