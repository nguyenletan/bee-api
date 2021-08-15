export interface IBuildingWindowUValuesReference {
  id: number;

  windowType: string;

  //(W/m2K)
  uValue: number;

  shadingCoefficient: number;
}

export const BuildingWindowUValuesReferences: IBuildingWindowUValuesReference[] =
  [
    {
      id: 1,
      windowType: 'Triple Glazed (Low-E Coating)',
      uValue: 1.8,
      shadingCoefficient: 1.8,
    },
    {
      id: 2,
      windowType: 'Double Glazed (Low-E Coating)',
      uValue: 1.99,
      shadingCoefficient: 0.85,
    },
    {
      id: 3,
      windowType: 'Double Glazed (No Low-E Coating)',
      uValue: 2.79,
      shadingCoefficient: 0.89,
    },
    {
      id: 4,
      windowType: 'Single Glazed',
      uValue: 6.17,
      shadingCoefficient: 0.95,
    },
  ];
