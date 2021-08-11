export interface ICountryGridEmissionReference {
  id: number;

  countryCode: string;

  // Ton/kWh
  CO2Emissions: number;
}

export const CountryGridEmissionReference: ICountryGridEmissionReference[] = [
  {
    id: 1,
    countryCode: 'UK',
    CO2Emissions: 0.000208,
  },
  {
    id: 2,
    countryCode: 'GE',
    CO2Emissions: 0.000208,
  },
];
