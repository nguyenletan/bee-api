import { ApiProperty } from '@nestjs/swagger';

export class SaveEnvelopFacadeSystemDto {
  @ApiProperty({
    description: 'The id of the enevelop facade system',
    example: 1,
  })
  id?: number;

  @ApiProperty({
    description: 'The id of the property',
    example: 1,
  })
  propId: number;

  @ApiProperty({
    description: 'The type of external roof insulation',
    example: 'Type A',
  })
  roofType?: string;

  @ApiProperty({
    description: 'The type of external window insulation',
    example: 'Type B',
  })
  externalWindowInsulationType?: string;

  @ApiProperty({
    description: 'The ratio of external windows to walls',
    example: 0.5,
  })
  externalWindowToWallRatio?: number;
}
