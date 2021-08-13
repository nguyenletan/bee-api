export interface IPVTechChoice {
  id: number;
  shortName: string;
  name: string;
}

export const PVTechChoices: IPVTechChoice[] = [
  {
    id: 1,
    shortName: 'crystSi',
    name: 'Crystal Silicon',
  },
  {
    id: 2,
    shortName: 'CIS',
    name: 'Copper Indium Selenide',
  },
  {
    id: 3,
    shortName: 'CdTe',
    name: 'Cadmium Telluride',
  },
  {
    id: 4,
    shortName: 'Unknown',
    name: 'Unknown',
  },
];
