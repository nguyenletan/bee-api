import { Module } from '@nestjs/common';
import { LightingSystemService } from './lighting-system.service';
import { LightingSystemController } from './lighting-system.controller';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [LightingSystemController],
  providers: [LightingSystemService, PrismaService],
})
export class LightingSystemModule {}
