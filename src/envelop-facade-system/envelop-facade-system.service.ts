import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SaveEnvelopFacadeSystemDto } from './dto/save-envelop-facade-system.dto';

@Injectable()
export class EnvelopFacadeSystemService {
  constructor(private prismaService: PrismaService) {}

  mapToEnvelopeFacadeSystem(envelopeFacadeSystem: SaveEnvelopFacadeSystemDto) {
    return {
      propId: Number(envelopeFacadeSystem.propId),
      roofType: envelopeFacadeSystem.roofType,
      externalWindowInsulationType: envelopeFacadeSystem.externalWindowInsulationType,
      externalWindowToWallRatio: Number(envelopeFacadeSystem.externalWindowToWallRatio),
    };
  }

  save(saveEnvelopFacadeSystemDto: SaveEnvelopFacadeSystemDto) {
    const envelopeFacadeSystem = this.mapToEnvelopeFacadeSystem(saveEnvelopFacadeSystemDto);
    return this.prismaService.envelopeFacadeSystem.upsert({
      where: { id: Number(saveEnvelopFacadeSystemDto.id) },
      update: envelopeFacadeSystem,
      create: envelopeFacadeSystem,
    });
  }
}
