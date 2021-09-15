import { PartialType } from '@nestjs/swagger';
import { CreateHistorizedPointDto } from './create-historized-point.dto';

export class UpdateHistorizedPointDto extends PartialType(
  CreateHistorizedPointDto,
) {}
