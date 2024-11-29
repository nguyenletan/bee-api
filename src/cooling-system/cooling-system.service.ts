import { Injectable } from '@nestjs/common';
import { SaveCoolingSystemDto } from './dto/save-cooling-system.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoolingSystemService {
  constructor(private prismaService: PrismaService) {}

  mapCoolingSystem(dto: SaveCoolingSystemDto) {
    return {
      propId: Number(dto.propId),
      compressorType: dto.compressorType,
      coolingSystemType: dto.coolingSystemType,
      chillerEnergySourceType: dto.chillerEnergySourceType,
      refrigerantType: dto.refrigerantType,
    };
  }

  async save(saveCoolingSystemDto: SaveCoolingSystemDto, user: any) {
    const { propId } = saveCoolingSystemDto;
    const existingCoolingSystem = await this.prismaService.coolingSystem.findFirst({
      where: { propId: Number(propId) },
    });

    const data = this.mapCoolingSystem(saveCoolingSystemDto);

    if (existingCoolingSystem) {
      if (saveCoolingSystemDto.isDeleted) {
        return this.prismaService.coolingSystem.delete({
          where: { propId: existingCoolingSystem.propId },
        });
      }

      return this.prismaService.coolingSystem.update({
        where: { id: existingCoolingSystem.id },
        data,
      });
    }

    return this.prismaService.coolingSystem.create({ data });
  }
}
