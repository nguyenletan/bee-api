export interface IBuildingEnvelopeUValueReference {
  id: number;
  year: number;
  walls: number | null;
  floors: number | null;
  pitchedRoof: number | null;
  flatRoof: number | null;
  description: string | null;
  // U-Value W/m2K
}

export const BuildingEnvelopeUValueReferences: IBuildingEnvelopeUValueReference[] =
  [
    {
      id: 1,
      year: 1965,
      walls: 1.7,
      floors: null,
      pitchedRoof: 1.4,
      flatRoof: 1.4,
      description: null,
    },
    {
      id: 2,
      year: 1976,
      walls: 1.0,
      floors: 1.0,
      pitchedRoof: 0.6,
      flatRoof: 0.6,
      description: null,
    },
    {
      id: 2,

      //(Retail, Offices & Places of Assembly)
      year: 1985,
      walls: 0.6,
      floors: 0.6,
      pitchedRoof: 0.6,
      flatRoof: 0.6,
      description: 'for Retail, Offices & Places of Assembly',
    },
    {
      id: 3,

      //(Industrial & Other Buildings)
      year: 1985,
      walls: 0.6,
      floors: 0.6,
      pitchedRoof: 0.6,
      flatRoof: 0.6,
      description: 'for Industrial & Other Buildings',
    },
    {
      id: 4,
      year: 1992,
      walls: 0.45,
      floors: 0.45,
      pitchedRoof: 0.45,
      flatRoof: 0.45,
      description: 'for Industrial & Other Buildings',
    },
    {
      id: 5,
      year: 1992,
      walls: 0.45,
      floors: 0.45,
      pitchedRoof: 0.45,
      flatRoof: 0.45,
      description: null,
    },
    {
      id: 6,
      year: 1995,
      walls: 0.45,
      floors: 0.45,
      pitchedRoof: 0.25,
      flatRoof: 0.25,
      description: null,
    },
    {
      id: 7,
      year: 2002,
      walls: 0.35,
      floors: 0.25,
      pitchedRoof: 0.25,
      flatRoof: 0.16,
      description: null,
    },
    {
      id: 8,
      year: 2006,
      walls: 0.35,
      floors: 0.25,
      pitchedRoof: 0.25,
      flatRoof: 0.25,
      description: null,
    },
    {
      id: 9,
      year: 2010,
      walls: 0.35,
      floors: 0.25,
      pitchedRoof: 0.25,
      flatRoof: 0.25,
      description: null,
    },
    {
      id: 10,
      year: 2013,
      walls: 0.35,
      floors: 0.25,
      pitchedRoof: 0.25,
      flatRoof: 0.25,
      description: null,
    },
    {
      id: 11,
      year: 2016,
      walls: 0.35,
      floors: 0.25,
      pitchedRoof: 0.25,
      flatRoof: 0.25,
      description: null,
    },
  ];
