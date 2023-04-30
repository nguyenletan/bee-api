export class TariffRateFormulas {
  // tariff rate = Total Energy Cost ($) / Total Energy Consumption (kWh)
  static calculateTariffRate(
    totalEnergyCost: number,
    totalEnergyConsumption: number,
  ): number {
    return totalEnergyCost / totalEnergyConsumption;
  }
}
