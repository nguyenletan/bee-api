import { Module } from '@nestjs/common';
import { CoolingSystemService } from './cooling-system.service';
import { CoolingSystemController } from './cooling-system.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoolingSystemController],
  providers: [CoolingSystemService, PrismaService],
  exports: [CoolingSystemService],
})
export class CoolingSystemModule {}
