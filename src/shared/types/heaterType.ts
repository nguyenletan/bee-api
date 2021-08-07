export interface IHeaterType {
  id: number;
  name: string;
}

export const HeaterTypes: IHeaterType[] = [
  {
    id: 1,
    name: 'Air Source Heat Pump',
  },
  {
    id: 2,
    name: 'Electric Resistance Heater',
  },
  {
    id: 3,
    name: 'Geothermal Heating',
  },
  {
    id: 4,
    name: 'District Heating',
  },
  {
    id: 5,
    name: 'Central Boiler',
  },
  {
    id: 6,
    name: 'Ground Source Heat Pump',
  },
  {
    id: 7,
    name: 'Absorption Heat Pump',
  },
];
