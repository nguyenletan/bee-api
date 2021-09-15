import { Module } from '@nestjs/common';
import { HistorizedPointsService } from './historized-points.service';
import { HistorizedPointsController } from './historized-points.controller';
import { PrismaService } from '../prisma.service';
import { SharedModule } from '../shared/shared.modules';

@Module({
  imports: [SharedModule],
  controllers: [HistorizedPointsController],
  providers: [HistorizedPointsService, PrismaService],
})
export class HistorizedPointsModule {}
