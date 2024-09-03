export class EnergyCostFormulas {
  // Tariff Rate = Annual Total Energy Cost ($/Yr) / Annual Total Energy Consumption (kWh/Yr)
  static calculateTariffRate(annualTotalEnergyCost: number, annualTotalEnergyConsumption: number): number {
    return annualTotalEnergyCost / annualTotalEnergyConsumption;
  }

  // Energy cost for each sub-system = Annual Energy Consumption for Cooling/Heating/Lighting/Mechanical Ventilation * Tariff Rate
  static calculateEnergyCostForEachSubSystem(
    annualTotalEnergyCost: number,
    annualTotalEnergyConsumption: number,
    annualEnergyConsumptionForOneSpace: number
  ): number {
    return annualEnergyConsumptionForOneSpace * this.calculateTariffRate(annualTotalEnergyCost, annualTotalEnergyConsumption);
  }
}
