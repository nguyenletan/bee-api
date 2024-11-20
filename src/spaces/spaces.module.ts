import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { PrismaService } from '../prisma.service';
import { SpacesController } from './spaces.controller';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService, PrismaService],
})
export class SpacesModule {}
