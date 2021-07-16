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

export class CreateBuildingDto {
  // buildingName: searchValue?.value?.structured_formatting?.main_text,
  // address: '',
  // city: '',
  // state: '',
  // countryCode: '',
  // suburb: '',
  // postalCode: '',
  // location: result?.results[0]?.geometry?.location,
  // formatted_address: result?.results[0]?.formatted_address,
  @ApiProperty()
  generalBuildingInformation: IGeneralBuildingInformation;
}
