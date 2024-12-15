import { Module } from '@nestjs/common';
import { OperationHoursService } from './operation-hours.service';
import { OperationHoursController } from './operation-hours.controller';

@Module({
  controllers: [OperationHoursController],
  providers: [OperationHoursService],
})
export class OperationHoursModule {}
