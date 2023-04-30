import { Module } from '@nestjs/common';
import { LightingSystemImprovementService } from './lighting-system-improvement.service';
import { LightingSystemImprovementController } from './lighting-system-improvement.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LightingSystemImprovementController],
  providers: [LightingSystemImprovementService, PrismaService],
})
export class LightingSystemImprovementModule {}
