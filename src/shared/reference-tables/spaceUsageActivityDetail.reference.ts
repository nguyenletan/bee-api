export interface ISpaceUsageActivityDetailReference {
  id: number;

  spaceUsageActivityAbbreviation: string;

  fullName: string;

  // (Person/m2)
  occupancyDens: number;

  // (W/Person)
  metabolicRate: number;

  //(L/s/Person)
  oaFlowPerson: number;

  // (lm/m2)
  lightingLux: number;

  equipmentWM2: number;

  heatGainFromLighting: number;

  externalHeatGain: number;

  solarGainCheck: number;

  otherGainsWM2: number;

  otherPercLat: number;

  otherGainsSch?: number | string;

  hwShowerFraction: number;

  // (W/m2)
  heatingLoad: number;
}

export const SpaceUsageActivityDetailReference: ISpaceUsageActivityDetailReference[] = [
  {
    id: 1,

    spaceUsageActivityAbbreviation: 'Store Room',

    fullName: 'Store Room',

    // (Person/m2)
    occupancyDens: 0.025,

    // (W/Person)
    metabolicRate: 140,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 50,

    equipmentWM2: 0,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 2,

    spaceUsageActivityAbbreviation: 'Circulation Area',

    fullName: 'Circulation area (corridors and stairways)',

    // (Person/m2)
    occupancyDens: 0.117333333,

    // (W/Person)
    metabolicRate: 140,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 100,

    equipmentWM2: 1.85,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 3,

    spaceUsageActivityAbbreviation: 'Toilet',

    fullName: 'Toilet',

    // (Person/m2)
    occupancyDens: 0.112444444,

    // (W/Person)
    metabolicRate: 140,

    //(L/s/Person)
    oaFlowPerson: 12,

    // (lm/m2)
    lightingLux: 200,

    equipmentWM2: 5.84,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 4,

    spaceUsageActivityAbbreviation: 'Reception',

    fullName: 'Reception',

    // (Person/m2)
    occupancyDens: 0.100833333,

    // (W/Person)
    metabolicRate: 140,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 200,

    equipmentWM2: 6.19,

    heatGainFromLighting: 12,

    externalHeatGain: 52,

    solarGainCheck: 1,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 5,

    spaceUsageActivityAbbreviation: 'Plant Room',

    fullName: 'Light plant room',

    // (Person/m2)
    occupancyDens: 0.11,

    // (W/Person)
    metabolicRate: 180,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 200,

    equipmentWM2: 52.5,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 6,

    spaceUsageActivityAbbreviation: 'Office',

    fullName: 'Generic Office Area',

    // (Person/m2)
    occupancyDens: 0.111,

    // (W/Person)
    metabolicRate: 123,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 400,

    equipmentWM2: 11.77,

    heatGainFromLighting: 12,

    externalHeatGain: 52,

    solarGainCheck: 1,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0.12,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 7,

    spaceUsageActivityAbbreviation: 'Gym',

    fullName: 'Fitness suite/gym',

    // (Person/m2)
    occupancyDens: 0.164848485,

    // (W/Person)
    metabolicRate: 300,

    //(L/s/Person)
    oaFlowPerson: 30,

    // (lm/m2)
    lightingLux: 150,

    equipmentWM2: 15,

    heatGainFromLighting: 12,

    externalHeatGain: 52,

    solarGainCheck: 1,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: 0,

    hwShowerFraction: 0,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 8,

    spaceUsageActivityAbbreviation: 'Changing Room with Showers',

    fullName: 'Changing facilities with showers',

    // (Person/m2)
    occupancyDens: 0.1,

    // (W/Person)
    metabolicRate: 140,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 100,

    equipmentWM2: 5,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 60,

    otherPercLat: 100,

    otherGainsSch: 'Occupancy',

    hwShowerFraction: 0.88,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 9,

    spaceUsageActivityAbbreviation: 'Food Preperation Area',

    fullName: 'Food Preperation Area',

    // (Person/m2)
    occupancyDens: 0.108035714,

    // (W/Person)
    metabolicRate: 180,

    //(L/s/Person)
    oaFlowPerson: 25,

    // (lm/m2)
    lightingLux: 500,

    equipmentWM2: 42.24,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0.12,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 10,

    spaceUsageActivityAbbreviation: 'Eating/drinking area',

    fullName: 'Eating/drinking area',

    // (Person/m2)
    occupancyDens: 0.288888889,

    // (W/Person)
    metabolicRate: 110,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 150,

    equipmentWM2: 14.72,

    heatGainFromLighting: 12,

    externalHeatGain: 52,

    solarGainCheck: 1,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0.12,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 11,

    spaceUsageActivityAbbreviation: 'Workshop - small scale',

    fullName: 'Workshop - small scale',

    // (Person/m2)
    occupancyDens: 0.05,

    // (W/Person)
    metabolicRate: 180,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 300,

    equipmentWM2: 5,

    heatGainFromLighting: 12,

    externalHeatGain: 52,

    solarGainCheck: 1,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0.12,

    // (W/m2)
    heatingLoad: 70,
  },
  {
    id: 12,

    spaceUsageActivityAbbreviation: 'Car Park',

    fullName: 'Car Park',

    // (Person/m2)
    occupancyDens: 0.005894737,

    // (W/Person)
    metabolicRate: 140,

    //(L/s/Person)
    oaFlowPerson: 10,

    // (lm/m2)
    lightingLux: 100,

    equipmentWM2: 0,

    heatGainFromLighting: 12,

    externalHeatGain: 0,

    solarGainCheck: 0,

    otherGainsWM2: 0,

    otherPercLat: 0,

    otherGainsSch: null,

    hwShowerFraction: 0.12,

    // (W/m2)
    heatingLoad: 70,
  },
];
