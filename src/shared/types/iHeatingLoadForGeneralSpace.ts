import { IEquipmentTypeGroup } from './iEquipmentTypeGroup';

export interface IHeatingLoadForGeneralSpace {
  heatingLoad: number;
  heatingLoadForSpace: number;
  equipmentTypeGroups: IEquipmentTypeGroup[] | null;
}
