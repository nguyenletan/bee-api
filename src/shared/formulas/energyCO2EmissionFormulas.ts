import { CountryGridEmissionReference } from '../reference-tables/countryGridEmission.reference';

export class EnergyCO2EmissionFormulas {
  // CO2 Emission for each sub-system = Energy Consumption for
  // Cooling/Heating/Lighting/Mechanical Ventilation/Others (kWh/Yr) * Grid Emission Rate(Tons/kWh)
  static calculateC02EmissionForEachSystem(energyConsumption: number, countryCode: string): number {
    const countryGridEmissionReference = CountryGridEmissionReference.find((x) => x.countryCode === countryCode);

    const gridEmissionRate = countryGridEmissionReference ? countryGridEmissionReference.CO2Emissions : CountryGridEmissionReference[0].CO2Emissions;

    return energyConsumption * gridEmissionRate;
  }
}
