import { Module } from '@nestjs/common';
import { SolarPanelSystemService } from './solar-panel-system.service';
import { SolarPanelSystemController } from './solar-panel-system.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SolarPanelSystemController],
  providers: [SolarPanelSystemService, PrismaService],
})
export class SolarPanelSystemModule {}
