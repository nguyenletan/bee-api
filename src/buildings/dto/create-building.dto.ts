import { ApiProperty } from '@nestjs/swagger';

interface ILocation {
  lat: number;
  lng: number;
}

interface IGeneralBuildingInformation {
  buildingName: string;

  address: string;

  city: string;

  state: string;

  countryCode: string;

  postalCode: string;

  suburb: string;

  location: ILocation;

  storeysAboveGround: number;

  storeysBelowGround: number;

  grossInteriorArea: number;

  netUsableArea: number;

  avgInternalFloorToCeilingHeight: number;

  buildingOrientedId: number;

  constructionPeriodValue: number;

  sustainabilityRatingSchemeId: number;

  sustainabilityRatingId: number;

  useTypeId: number;

  buildingPhoto: string;
}

interface IBuildingActivity {
  name: string;
  codeName: string;
  startTime: Date;
  endTime: Date;
  isEnable: boolean;
}

export interface ISpaceUsageGFA {
  title: string;
  typeId: number;
  percentage: number;
  climateControlId: number;
  fanTypeId: number;
  hasReheatRecovery: boolean;
}

export class CreateBuildingDto {
  @ApiProperty()
  generalBuildingInformation: IGeneralBuildingInformation;

  @ApiProperty()
  buildingActivity: IBuildingActivity[];

  @ApiProperty()
  spaceUsageGFAList: ISpaceUsageGFA[];
}
