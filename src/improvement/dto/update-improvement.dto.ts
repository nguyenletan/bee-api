import { PartialType } from '@nestjs/swagger';
import { CreateImprovementDto } from './create-improvement.dto';

export class UpdateImprovementDto extends PartialType(CreateImprovementDto) {}
