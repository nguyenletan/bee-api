export interface ITrackingType {
  id: number;
  name: string;
}

export const TrackingTypes: ITrackingType[] = [
  {
    id: 1,
    name: 'Fixed',
  },
  {
    id: 2,
    name: 'Vertical Axis Tracking',
  },
  {
    id: 3,
    name: 'Incline Axis Tracking',
  },
  {
    id: 4,
    name: 'Two-Axis Tracking',
  },
];
