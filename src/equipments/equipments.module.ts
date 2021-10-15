import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EquipmentsController],
  providers: [EquipmentsService, PrismaService],
})
export class EquipmentsModule {}
