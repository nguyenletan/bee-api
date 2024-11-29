import { Injectable } from '@nestjs/common';
import { SaveHeatingSystemDto } from './dto/save-heating-system.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HeatingSystemService {
  constructor(private readonly prismaService: PrismaService) {}

  mapHeatingSystem(dto: SaveHeatingSystemDto) {
    return {
      propId: Number(dto.propId),
      heatingSystemType: dto.heatingSystemType,
      heaterType: dto.heaterType,
      heaterEnergySourceType: dto.heaterEnergySourceType,
    };
  }

  async save(saveHeatingSystemDto: SaveHeatingSystemDto) {
    const { propId } = saveHeatingSystemDto;
    const existingHeatingSystem = await this.prismaService.heatingSystem.findFirst({
      where: { propId: Number(propId) },
    });
    const data = this.mapHeatingSystem(saveHeatingSystemDto);

    if (existingHeatingSystem) {
      if (saveHeatingSystemDto.isDeleted) {
        return this.prismaService.heatingSystem.delete({
          where: { id: existingHeatingSystem.id },
        });
      }
      return this.prismaService.heatingSystem.update({
        where: { id: existingHeatingSystem.id },
        data,
      });
    }
    return this.prismaService.heatingSystem.create({
      data,
    });
  }
}
