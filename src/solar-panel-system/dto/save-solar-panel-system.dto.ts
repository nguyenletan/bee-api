export class SaveSolarPanelSystemDto {
  id: number;
  propId: number;
  installedCapacity?: number;
  systemLoss?: number;
  inclineAngle?: number;
  orientationAngle?: number;
  trackingType?: string;
  pvPanelType?: string;
  mountingType?: string;
  unknownInclineAngle?: boolean;
  unknownOrientationAngle?: boolean;
  isDeleted?: boolean;
}
