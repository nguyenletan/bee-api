import { ApiProperty } from '@nestjs/swagger';

export class SaveCoolingSystemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  propId: number;

  @ApiProperty()
  compressorType?: string;

  @ApiProperty()
  coolingSystemType?: string;

  @ApiProperty()
  chillerEnergySourceType?: string;

  @ApiProperty()
  refrigerantType?: string;

  @ApiProperty()
  isDeleted?: boolean;
}
