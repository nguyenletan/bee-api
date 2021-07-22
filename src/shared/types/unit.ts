export enum LengthMeasureUnit {
  Metre = 'm',
  Feet = 'ft',
}

export enum AreaMeasureUnit {
  SquareMetre = 'm2',
  SquareFeet = 'ft2',
}

export const metreToFeet = (metre: number): number => {
  return metre * 3.2808399;
};

export const feetToMetre = (feet: number): number => {
  return feet * 0.3048;
};
