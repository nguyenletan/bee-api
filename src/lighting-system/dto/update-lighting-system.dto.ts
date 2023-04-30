import { PartialType } from '@nestjs/swagger';
import { CreateLightingSystemDto } from './create-lighting-system.dto';

export class UpdateLightingSystemDto extends PartialType(CreateLightingSystemDto) {}
