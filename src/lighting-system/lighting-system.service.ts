import { Injectable } from '@nestjs/common';
import { SaveLightingSystemDto } from './dto/save-lighting-system.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LightingSystemService {
  constructor(private prismaService: PrismaService) {}

  mapLightingSystem(dto: SaveLightingSystemDto) {
    return {
      propId: Number(dto.propId),
      title: dto.title,
      lightingFittingType: dto.lightingFittingType,
      percentageOfFittingTypeUsage: Number(dto.percentageOfFittingTypeUsage),
      isDeleted: dto.isDeleted,
    };
  }

  async save(saveLightingSystemDto: SaveLightingSystemDto[]) {
    const createDtos = saveLightingSystemDto.filter((dto) => !dto.id);
    const deleteDtos = saveLightingSystemDto.filter((dto) => dto.id && dto.isDeleted);
    const updateDtos = saveLightingSystemDto.filter((dto) => dto.id && !dto.isDeleted);

    try {
      // Create new records in bulk
      if (createDtos.length > 0) {
        await this.prismaService.lightingSystem.createMany({
          data: createDtos.map((dto) => this.mapLightingSystem(dto)),
        });
      }

      // Update existing records in parallel
      await Promise.all(
        updateDtos.map((dto) =>
          this.prismaService.lightingSystem.update({
            where: { id: dto.id },
            data: this.mapLightingSystem(dto),
          })
        )
      );

      await this.prismaService.lightingSystem.deleteMany({
        where: {
          id: {
            in: deleteDtos.map((dto) => dto.id),
          },
        },
      });
    } catch (error) {
      console.error('Error saving electricity consumption:', error);
      throw error; // Re-throw the error to handle it in the controller
    }
  }
}
