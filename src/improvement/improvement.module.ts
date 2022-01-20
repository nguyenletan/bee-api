import { Module } from '@nestjs/common';
import { ImprovementService } from './improvement.service';
import { ImprovementController } from './improvement.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ImprovementController],
  providers: [ImprovementService, PrismaService],
})
export class ImprovementModule {}
