import { Module } from '@nestjs/common';
import { HeatingConsumptionsService } from './heating-consumptions.service';
import { HeatingConsumptionsController } from './heating-consumptions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HeatingConsumptionsController],
  providers: [HeatingConsumptionsService, PrismaService],
})
export class HeatingConsumptionsModule {}
