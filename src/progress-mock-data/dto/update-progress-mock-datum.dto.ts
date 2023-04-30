import { PartialType } from '@nestjs/swagger';
import { CreateProgressMockDatumDto } from './create-progress-mock-datum.dto';

export class UpdateProgressMockDatumDto extends PartialType(CreateProgressMockDatumDto) {}
