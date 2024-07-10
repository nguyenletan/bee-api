import { PartialType } from '@nestjs/swagger';
import { CreateBcaDto } from './create-bca.dto';

export class UpdateBcaDto extends PartialType(CreateBcaDto) {}
