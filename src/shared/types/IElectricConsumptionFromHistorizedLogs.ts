export interface IElectricConsumptionItem {
  label: string;
  value: number;
  year: number | null | undefined;
  month: number | null | undefined;
  day: number | null | undefined;
}

export interface IElectricConsumptionFromHistorizedLogsSubSystem {
  electricConsumptionGroupByYear: IElectricConsumptionItem[];
  electricConsumptionGroupByQuarter: IElectricConsumptionItem[];
  electricConsumptionGroupByMonth: IElectricConsumptionItem[];
  electricConsumptionGroupByWeek: IElectricConsumptionItem[];
  electricConsumptionGroupByDay: IElectricConsumptionItem[];
}

export interface IElectricConsumptionFromHistorizedLogs {
  overall: IElectricConsumptionFromHistorizedLogsSubSystem;

  coolingSystem: IElectricConsumptionFromHistorizedLogsSubSystem;
}
