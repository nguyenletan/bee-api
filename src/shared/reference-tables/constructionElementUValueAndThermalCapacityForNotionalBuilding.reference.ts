/// Reference link: https://lastingfootprint.atlassian.net/wiki/spaces/BEEB/pages/730791937/Energy+Performance+Certificate+UK+-+Non-Domestic

export interface IConstructionElementUValueAndThermalCapacityForNotionalBuildingReference {
  id: number;
  element: string;
  uValue: number;
  thermalUnit: string;
  getThermal(isMetalClad?: boolean): number | null;
}

export const ConstructionElementUValueAndThermalCapacityForNotionalBuildingReference: IConstructionElementUValueAndThermalCapacityForNotionalBuildingReference[] =
  [
    {
      id: 1,
      element: 'Roofs',
      uValue: 0.18,
      getThermal(isMetalClad = false) {
        return isMetalClad === false ? 88.3 : 1.4;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 2,
      element: 'Walls',
      uValue: 0.26,
      getThermal(isMetalClad = false) {
        return isMetalClad === false ? 21.8 : 1.4;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 3,
      element: 'Exposed floors and ground floors',
      uValue: 0.22,
      getThermal(): number {
        return 77.7;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 4,
      element: 'Windows*',
      uValue: 1.6,
      getThermal() {
        return null;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 5,
      element: 'Roof windows and roof-lights*',
      uValue: 1.8,
      getThermal() {
        return null;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 6,
      element: 'Vehicle access and similar large doors',
      uValue: 1.5,
      getThermal() {
        return 2.1;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 7,
      element: 'Pedestrian doors and high usage  access and similar large doors',
      uValue: 2.2,
      getThermal() {
        return 54.6;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 7,
      element: 'Internal Wall',
      uValue: 1.8,
      getThermal() {
        return 8.8;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 8,
      element: 'Internal floor/ceiling (from above)',
      uValue: 1,
      getThermal() {
        return 71.8;
      },
      thermalUnit: 'kj/m2K',
    },
    {
      id: 9,
      element: 'Internal floor/ceiling (from below)',
      uValue: 1,
      getThermal() {
        return 66.6;
      },
      thermalUnit: 'kj/m2K',
    },
  ];
