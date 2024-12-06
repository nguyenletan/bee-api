import { Module } from '@nestjs/common';
import { EnvelopFacadeSystemService } from './envelop-facade-system.service';
import { EnvelopFacadeSystemController } from './envelop-facade-system.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EnvelopFacadeSystemController],
  providers: [EnvelopFacadeSystemService, PrismaService],
})
export class EnvelopFacadeSystemModule {}
