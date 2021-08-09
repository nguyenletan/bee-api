export interface ICorrespondingEfficiencyRatioReference {
  id: number;
  name: string;
  cooling?: number;
  heating?: number;
  directElectric?: number;
}

export const CorrespondingEfficiencyRatios: ICorrespondingEfficiencyRatioReference[] =
  [
    {
      id: 1,
      name: 'Heated Only',
      cooling: null,
      heating: 2.43,
      directElectric: 0.86,
    },
    {
      id: 2,
      name: 'Cooled Only',
      cooling: 3.6,
      heating: null,
      directElectric: null,
    },
    {
      id: 3,
      name: 'Heated And Cooled',
      cooling: 2.7,
      heating: 2.43,
      directElectric: 0.819,
    },
    {
      id: 4,
      name: 'Heated And Cooled',
      cooling: null,
      heating: null,
      directElectric: null,
    },
  ];
