// const breakDownConsumption = [
//   { id: 'cooling', value: 30, color: '#636c2e' },
//   { id: 'heating', value: 40, color: '#87972f' },
//   { id: 'lighting', value: 20, color: '#acbf42' },
//   { id: 'mechanical ventilation', value: 6, color: '#c1cf74' },
//   { id: 'others', value: 4, color: '#d5dfa3' }]
export interface IBreakdownConsumption {
  id: string;
  value: number;
  consumption: number;
  color: string;
  equipId?: number;
  subBreakdown: IBreakdownConsumption[] | null;
}
