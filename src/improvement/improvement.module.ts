import { Module } from '@nestjs/common';
import { ImprovementService } from './improvement.service';
import { ImprovementController } from './improvement.controller';
import { PrismaService } from '../prisma.service';
import { HistorizedPointsService } from '../historized-points/historized-points.service';

@Module({
  controllers: [ImprovementController],
  providers: [ImprovementService, PrismaService, HistorizedPointsService],
})
export class ImprovementModule {}
