import { IEquipmentGroup } from './iEquipmentGroup';

export interface IEquipmentTypeGroup {
  id: number;
  name: string;
  sum: number;
  equipmentGroups: IEquipmentGroup[] | null;
}
