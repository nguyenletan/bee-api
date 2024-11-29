import { PartialType } from '@nestjs/swagger';
import { CreateHeatingConsumptionDto } from './create-heating-consumption.dto';

export class UpdateHeatingConsumptionDto extends PartialType(CreateHeatingConsumptionDto) {}
