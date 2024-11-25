import { Module } from '@nestjs/common';
import { ElectricityConsumptionsService } from './electricity-consumptions.service';
import { ElectricityConsumptionsController } from './electricity-consumptions.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ElectricityConsumptionsController],
  providers: [ElectricityConsumptionsService, PrismaService],
})
export class ElectricityConsumptionsModule {}
