import { PartialType } from '@nestjs/swagger';
import { CreateLightingSystemImprovementDto } from './create-lighting-system-improvement.dto';

export class UpdateLightingSystemImprovementDto extends PartialType(CreateLightingSystemImprovementDto) {}
