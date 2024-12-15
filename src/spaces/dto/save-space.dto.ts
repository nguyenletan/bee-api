import { SaveOperationHoursDto } from "src/operation-hours/dto/save-operation-hours.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SaveSpaceDto {
  @ApiProperty({
    description: "The id of the space",
    example: 1,
  })
  id: number;
  
  @ApiProperty({
    description: "The id of the property",
    example: 1,
  })
  propId: number;
  
  @ApiProperty({
    description: "The name of the space",
    example: "Space 1",
  })
  name?: string;
  
  @ApiProperty({
    description: "The floor of the space",
    example: 1,
  })
  floor?: number;
  
  @ApiProperty({
    description: "The from floor of the space",
    example: 1,
  })
  fromFloor?: number;
  
  @ApiProperty({
    description: "The to floor of the space",
    example: 1,
  })
  toFloor?: number;

  @ApiProperty({
    description: "The space usage type of the space",
    example: "Office",
  })
  spaceUsageType?: string;

  @ApiProperty({
    description: "The area of the space",
    example: 100,
  })
  area?: number;

  @ApiProperty({
    description: "The operation hours of the space",
    example: [],
  })
  operationHours?: SaveOperationHoursDto[];
}
