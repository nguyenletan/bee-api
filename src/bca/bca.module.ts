import { Module } from '@nestjs/common';
import { BcaService } from './bca.service';
import { BcaController } from './bca.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BcaController],
  providers: [BcaService, PrismaService],
})
export class BcaModule {}
