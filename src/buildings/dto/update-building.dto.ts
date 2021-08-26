import { PartialType } from '@nestjs/swagger';
import { BuildingDto } from './building.dto';

export class UpdateBuildingDto extends PartialType(BuildingDto) {}
