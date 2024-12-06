import { ApiProperty } from '@nestjs/swagger';

export class SaveLightingSystemDto {
  @ApiProperty({
    description: 'The id of the lighting system',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The id of the property',
    example: 1,
  })
  propId: number;

  @ApiProperty({
    description: 'The title of the lighting system',
    example: 'Living Room',
  })
  title: string;

  @ApiProperty({
    description: 'The type of the lighting system',
    example: 'LED',
  })
  lightingFittingType: string;

  @ApiProperty({
    description: 'The percentage of the lighting system',
    example: 100,
  })
  percentageOfFittingTypeUsage: number;

  @ApiProperty({
    description: 'The isDeleted of the lighting system',
    example: false,
  })
  isDeleted: boolean;
}
