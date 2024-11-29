import { ApiProperty } from '@nestjs/swagger';

export class SaveHeatingSystemDto {
  @ApiProperty({ description: 'The id of the heating system', example: 1 })
  id: number;

  @ApiProperty({ description: 'The id of the property', example: 1 })
  propId: number;

  @ApiProperty({ description: 'The type of the heating system', example: 'Gas' })
  heatingSystemType: string;

  @ApiProperty({
    description: 'The type of the heating system',
    example: 'Gas',
  })
  @ApiProperty({ description: 'The type of the heating system', example: 'Gas' })
  heaterType: string;

  @ApiProperty({
    description: 'The energy source type of the heating system',
    example: 'Gas',
  })
  heaterEnergySourceType: string;

  @ApiProperty({
    description: 'The isDeleted of the heating system',
    example: false,
  })
  isDeleted: boolean;
}
