export interface ILightFittingEfficacyReference {
  id: number;

  lightFitting: string;

  // (lm/W)
  efficacy: number;
}

export const LightFittingEfficacyReference: ILightFittingEfficacyReference[] = [
  {
    id: 1,

    lightFitting: 'LED',

    // (lm/W)
    efficacy: 55,
  },
  {
    id: 2,

    lightFitting: 'Compact Fluorescent Tube',

    // (lm/W)
    efficacy: 27,
  },
  {
    id: 3,

    lightFitting: 'Fluorescent T5 Tube',

    // (lm/W)
    efficacy: 45,
  },
  {
    id: 4,

    lightFitting: 'Fluorescent T8 Tube',

    // (lm/W)
    efficacy: 43.5,
  },
  {
    id: 5,

    lightFitting: 'Fluorescent T12 Tube',

    // (lm/W)
    efficacy: 30,
  },
  {
    id: 6,

    lightFitting: 'Others',

    // (lm/W)
    efficacy: 0,
  },
];
