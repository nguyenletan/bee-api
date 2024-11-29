import { ApiProperty } from '@nestjs/swagger';

export class SaveHeatingConsumptionDto {
  @ApiProperty({
    description: 'The id of the heating consumption',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The id of the property',
    example: 1,
  })
  propId: number;

  @ApiProperty({
    description: 'The year of the heating consumption',
    example: '2024',
  })
  year: number;

  @ApiProperty({
    description: 'The month of the heating consumption',
    example: '5',
  })
  month: number;

  @ApiProperty({
    description: 'The monthly cost of the heating consumption',
    example: 100,
  })
  monthlyCost: number;

  @ApiProperty({
    description: 'The monthly value of the heating consumption',
    example: 100,
  })
  monthlyValue: number;

  @ApiProperty({
    description: 'The heat type of the heating consumption',
    example: 'Gas',
  })
  heatType?: string;

  @ApiProperty({
    description: 'The isDeleted of the heating consumption',
    example: false,
  })
  isDeleted?: boolean;
}
