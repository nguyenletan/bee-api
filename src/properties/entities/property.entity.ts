import { ApiProperty } from '@nestjs/swagger';
import { AreaMeasureUnit, LengthMeasureUnit } from '../../shared/types/unit';

export type LocationType = {
  lat: number;
  lng: number;
};

export type BuildingActivityType = {
  id: number | null;
  //averageOperatingHoursId: number | null;
  name: string;
  codeName: string;
  startTime: Date;
  endTime: Date;
  isEnable: boolean;
};

export type SpaceUsageGFAType = {
  id: number | null;
  title: string;
  typeId: number;
  percentage: number;
  climateControlId: number;
  fanTypeId: number | string | null;
  hasReheatRecovery: boolean;
};

export type ElectricityConsumptionType = {
  id: number | null;
  month: number;
  year: number;
  value: number;
  cost: number;
};

export type HeatConsumptionType = {
  id: number | null;
  month: number;
  year: number;
  heattype: number;
  value: number;
  cost: number;
};

export type CoolingSystemType = {
  id: number | null;
  chillerId: number | null;
  hasCoolingSystem: boolean;
  coolingSystemTypeId: number;
  compressorTypeId: number;
  refrigerantTypeId: number;
  chillerEnergySourceTypeId: number;
};

export type HeatingSystemType = {
  id: number | null;
  heaterId: number | null;
  hasHeatingSystem: boolean;
  heatingSystemTypeId: number;
  heaterTypeId: number;
  heaterEnergySourceTypeId: number;
};

export type LightingSubSystemType = {
  id: number | null;
  title: string;
  indoorLightingSystemTypeId: number;
  percentage: number;
  numberOfBulbs: number;
  wattRatingOfBulb: number;
  lumensOfBulb: number;
  numberOfDaysUsedPerWeek: number;
  numberOfHoursUsedPerDay: number;
};

export type EnvelopFacadeType = {
  id: number | null;
  externalWindowToWallRatio: number;
  externalRoofInsulationTypeId: number;
  externalWallInsulationTypeId: number;
  externalWindowInsulationTypeId: number;
  externalGroundFloorInsulationTypeId: number;
};

export type SolarPanelSystemType = {
  id: number | null;
  title: string;
  installedCapacity: number;
  trackingTypeId: number;
  inclineAngel: number;
  orientationAngle: number;
  systemLoss: number;
  pvTechChoiceId: number;
  mountingTypeId: number;
  isNewItem?: boolean;
};

export class Property {
  @ApiProperty()
  id: number | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  streetAddress: string;

  @ApiProperty()
  streetName: string;

  @ApiProperty()
  streetNumber?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  postCode: string;

  @ApiProperty()
  suburb?: string;

  @ApiProperty()
  location?: LocationType;

  @ApiProperty()
  completionYear?: number;

  @ApiProperty()
  constructionPeriod?: string;

  @ApiProperty()
  storeysAboveGround?: number;

  @ApiProperty()
  storeysBelowGround?: number;

  @ApiProperty()
  grossInteriorArea?: number;

  @ApiProperty()
  grossInteriorAreaUnit?: AreaMeasureUnit;

  @ApiProperty()
  netUsableArea?: number;

  @ApiProperty()
  netUsableAreaUnit?: AreaMeasureUnit;

  @ApiProperty()
  averageInternalFloorToCeilingHeight?: number;

  @ApiProperty()
  averageInternalFloorToCeilingHeightUnit?: LengthMeasureUnit;

  @ApiProperty()
  buildingOrientation?: string;

  @ApiProperty()
  constructionPeriodValue?: number;

  @ApiProperty()
  sustainabilityRatingSchemeId?: number;

  @ApiProperty()
  sustainabilityRatingId?: number;

  @ApiProperty()
  useTypeId?: number;

  @ApiProperty()
  photo?: string;

  @ApiProperty()
  hasMajorRefurbishmentOrExtensionsDone?: boolean;

  @ApiProperty()
  latestYearForRefurbishmentOrExtension?: number;

  @ApiProperty()
  statusId?: number;

  @ApiProperty()
  editedBy?: string;

  @ApiProperty()
  buildingActivity?: BuildingActivityType[];

  @ApiProperty()
  spaceUsageGFAList?: SpaceUsageGFAType[];

  @ApiProperty()
  electricityConsumptionList?: ElectricityConsumptionType[];

  @ApiProperty()
  heatConsumptionList?: HeatConsumptionType[];

  @ApiProperty()
  coolingSystem?: CoolingSystemType;

  @ApiProperty()
  heatingSystem?: HeatingSystemType;

  @ApiProperty()
  lightingSubSystemList?: LightingSubSystemType[];

  @ApiProperty()
  envelopFacade?: EnvelopFacadeType;

  @ApiProperty()
  solarPanelSystemList?: SolarPanelSystemType[];
}
