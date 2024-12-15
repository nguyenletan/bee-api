import { ApiProperty } from '@nestjs/swagger';

export class SaveOperationHoursDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codeName: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  isEnable: boolean;
}
