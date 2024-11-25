import { ApiProperty } from '@nestjs/swagger';

export class SaveElectricityConsumptionDto {
  @ApiProperty({
    description: 'The id of the property',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The month of the electricity consumption',
    example: '5',
  })
  month: number;

  @ApiProperty({
    description: 'The year of the electricity consumption',
    example: '2024',
  })
  year: number;

  @ApiProperty({
    description: 'The value of the electricity consumption',
    example: 100,
  })
  monthlyValue: number;

  @ApiProperty({
    description: 'The monthly cost of the electricity consumption',
    example: 100,
  })
  monthlyCost: number;

  @ApiProperty({
    description: 'The isDeleted of the electricity consumption',
    example: false,
  })
  isDeleted?: boolean;

  @ApiProperty({
    description: 'The id of the property',
    example: 1,
  })
  propId: number;
}
