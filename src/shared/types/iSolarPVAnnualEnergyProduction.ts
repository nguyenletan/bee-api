export interface ISolarPVAnnualEnergyProduction {
  // E_d: Average daily energy production from the given system (kWh/d)
  //
  // E_m: Average monthly energy production from the given system (kWh/mo)
  //
  // H(i)_d: Average daily sum of global irradiation per square meter received by the modules of the given system (kWh/m2/d)
  //
  // H(i)_m: Average monthly sum of global irradiation per square meter received by the modules of the given system (kWh/m2/mo)
  //
  // SD_m: Standard deviation of the monthly energy production due to year-to-year variation (kWh)

  // E_d
  averageDailyEnergyProduction: number;

  // E_m
  averageMonthlyEnergyProduction: number;

  //H(i)_d
  averageDailySumOfGlobalIrradiationPerM2: number;

  //H(i)_m
  averageMonthlySumOfGlobalIrradiationPerM2: number;

  //SD_m
  standardDeviationOfTheMonthlyEnergyProduction: number;
}
