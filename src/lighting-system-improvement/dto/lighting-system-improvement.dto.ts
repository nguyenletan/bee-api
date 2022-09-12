import { ApiProperty } from '@nestjs/swagger';

export interface ILightingSystemImprovementDto {
  id: number | null;
  lightingFittingTypeId: number | null;
  lumensOfBulb: number | null;
  numberOfBulbs: number | null;
  numberOfDaysUsedPerWeek: number | null;
  numberOfHoursUsedPerDay: number | null;
  numberOfOldBulbs: number | null;
  numberOfReplacingBulbs: number | null;
  propId: number | null;
  title: string | null;
  wattRatingOfBulb: number | null;
  userExternalId: string | null;
  lightSystemId: number | null;
  costPerBulb: number | null;
}

export class LightingSystemImprovementDto
  implements ILightingSystemImprovementDto
{
  @ApiProperty()
  id: number | null;
  @ApiProperty()
  lightingFittingTypeId: number | null;
  @ApiProperty()
  lumensOfBulb: number | null;
  @ApiProperty()
  numberOfBulbs: number | null;
  @ApiProperty()
  numberOfDaysUsedPerWeek: number | null;
  @ApiProperty()
  numberOfHoursUsedPerDay: number | null;
  @ApiProperty()
  numberOfOldBulbs: number | null;
  @ApiProperty()
  numberOfReplacingBulbs: number | null;
  @ApiProperty()
  propId: number | null;
  @ApiProperty()
  title: string | null;
  @ApiProperty()
  wattRatingOfBulb: number | null;
  @ApiProperty()
  userExternalId: string | null;
  @ApiProperty()
  lightSystemId: number | null;
  @ApiProperty()
  costPerBulb: number | null;
}
