import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { PrismaService } from '../prisma.service';
import { SharedModule } from '../shared/shared.modules';

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [BuildingsController],
  providers: [BuildingsService, PrismaService],
})
export class BuildingsModule {}
