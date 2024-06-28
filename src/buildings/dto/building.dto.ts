import { ApiProperty } from '@nestjs/swagger';
import { AreaMeasureUnit, LengthMeasureUnit } from '../../shared/types/unit';

interface ILocation {
  lat: number;
  lng: number;
}

export interface IGeneralBuildingInformation {
  id: number | null;
  propId: number | null;
  buildingName: string;

  address: string;
  streetName: string;
  streetNumber: string;

  city: string;

  state: string;

  countryCode: string;

  postalCode: string;

  suburb: string;

  location: ILocation;

  storeysAboveGround: number;

  storeysBelowGround: number;

  grossInteriorArea: number;
  grossInteriorAreaUnit: AreaMeasureUnit;

  netUsableArea: number;
  netUsableAreaUnit: AreaMeasureUnit;

  avgInternalFloorToCeilingHeight: number;
  avgInternalFloorToCeilingHeightUnit: LengthMeasureUnit;

  buildingOrientedId: number;

  constructionPeriodValue: number;

  sustainabilityRatingSchemeId: number;

  sustainabilityRatingId: number;

  useTypeId: number;

  buildingPhoto: string;

  hasMajorRefurbishmentOrExtensionsDone: boolean;

  latestYearForRefurbishmentOrExtension: number;

  statusId?: 0 | 1 | 2 | 3;
}

export interface IBuildingActivity {
  id: number | null;
  averageOperatingHoursId: number | null;
  name: string;
  codeName: string;
  startTime: Date;
  endTime: Date;
  isEnable: boolean;
}

export interface ISpaceUsageGFA {
  id: number | null;
  title: string;
  typeId: number;
  percentage: number;
  climateControlId: number;
  fanTypeId: number | string | null;
  hasReheatRecovery: boolean;
}

export interface IElectricityConsumption {
  id: number | null;
  month: number;
  year: number;
  value: number;
  cost: number;
}

export interface IHeatConsumption {
  id: number | null;
  month: number;
  year: number;
  heattype: number;
  value: number;
  cost: number;
}

export interface ICoolingSystem {
  id: number | null;
  chillerId: number | null;
  hasCoolingSystem: boolean;
  coolingSystemTypeId: number;
  compressorTypeId: number;
  refrigerantTypeId: number;
  chillerEnergySourceTypeId: number;
}

export interface IHeatingSystem {
  id: number | null;
  heaterId: number | null;
  hasHeatingSystem: boolean;
  heatingSystemTypeId: number;
  heaterTypeId: number;
  heaterEnergySourceTypeId: number;
}

export interface ILightingSubSystem {
  id: number | null;
  title: string;
  indoorLightingSystemTypeId: number;
  percentage: number;
  numberOfBulbs: number;
  wattRatingOfBulb: number;
  lumensOfBulb: number;
  numberOfDaysUsedPerWeek: number;
  numberOfHoursUsedPerDay: number;
}

export interface IEnvelopFacade {
  id: number | null;
  externalWindowToWallRatio: number;
  externalRoofInsulationTypeId: number;
  externalWallInsulationTypeId: number;
  externalWindowInsulationTypeId: number;
  externalGroundFloorInsulationTypeId: number;
}

export interface ISolarPanelSystem {
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
}

export interface ICreateBuildingDto {
  generalBuildingInformation: IGeneralBuildingInformation | null;

  buildingActivity: IBuildingActivity[] | null;

  spaceUsageGFAList: ISpaceUsageGFA[] | null;

  electricityConsumptionList: IElectricityConsumption[] | null;

  heatConsumptionList: IHeatConsumption[] | null;

  coolingSystem: ICoolingSystem | null;

  heatingSystem: IHeatingSystem | null;

  lightingSubSystemList: ILightingSubSystem[] | null;

  envelopFacade: IEnvelopFacade | null;

  solarPanelSystemList: ISolarPanelSystem[] | null;
}

export class BuildingDto implements ICreateBuildingDto {
  @ApiProperty()
  generalBuildingInformation: IGeneralBuildingInformation;

  @ApiProperty()
  buildingActivity: IBuildingActivity[];

  @ApiProperty()
  spaceUsageGFAList: ISpaceUsageGFA[];

  @ApiProperty()
  electricityConsumptionList: IElectricityConsumption[];

  @ApiProperty()
  heatConsumptionList: IHeatConsumption[];

  @ApiProperty()
  coolingSystem: ICoolingSystem;

  @ApiProperty()
  heatingSystem: IHeatingSystem;

  @ApiProperty()
  lightingSubSystemList: ILightingSubSystem[];

  @ApiProperty()
  envelopFacade: IEnvelopFacade;

  @ApiProperty()
  solarPanelSystemList: ISolarPanelSystem[];
}
