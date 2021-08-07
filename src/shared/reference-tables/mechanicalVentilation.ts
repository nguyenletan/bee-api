export interface IMechanicalVentilationSpecificFanPower {
  id: number;
  application: string;
  fanTypeId: number;
  hasHeatRecovery: boolean;
  // W/m3/s
  specificFanPower: number;
}

export const MechanicalVentilationSpecificFanPowers: IMechanicalVentilationSpecificFanPower[] =
  [
    {
      id: 1,
      application: 'Supply air fan with heat recovery',
      fanTypeId: 1,
      hasHeatRecovery: true,
      specificFanPower: 2000,
    },
    {
      id: 2,
      application: 'Supply air fan without heat recovery',
      fanTypeId: 1,
      hasHeatRecovery: false,
      specificFanPower: 1250,
    },
    {
      id: 3,
      application: 'Exhaust air fan with heat recovery',
      fanTypeId: 2,
      hasHeatRecovery: true,
      specificFanPower: 1250,
    },
    {
      id: 4,
      application: 'Exhaust air fan without heat recovery',
      fanTypeId: 2,
      hasHeatRecovery: false,
      specificFanPower: 750,
    },
    {
      id: 5,
      application: 'Supply & Exhaust air fan with heat recovery',
      fanTypeId: 3,
      hasHeatRecovery: true,
      specificFanPower: 3250,
    },
    {
      id: 6,
      application: 'Supply & Exhaust air fan without heat recovery',
      fanTypeId: 3,
      hasHeatRecovery: false,
      specificFanPower: 2000,
    },
  ];
