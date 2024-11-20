//Space DTO:
// - id: number
// - name: string
// - floor: number
// - propId: number
// - spaceUsageTypeId: number
// - area: number

export class CreateSpaceDto {
  name: string;
  floor: number;
  propId: number;
  spaceUsageTypeId: number;
  area: number;
}
