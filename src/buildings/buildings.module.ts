import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { PrismaService } from '../prisma.service';
import { SharedModule } from '../shared/shared.modules';
import { HistorizedPointsService } from '../historized-points/historized-points.service';

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [BuildingsController],
  providers: [BuildingsService, PrismaService, HistorizedPointsService],
})
export class BuildingsModule {}
