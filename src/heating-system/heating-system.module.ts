import { Module } from '@nestjs/common';
import { HeatingSystemService } from './heating-system.service';
import { HeatingSystemController } from './heating-system.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HeatingSystemController],
  providers: [HeatingSystemService, PrismaService],
})
export class HeatingSystemModule {}
