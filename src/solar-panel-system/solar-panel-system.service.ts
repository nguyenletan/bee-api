import { Injectable } from '@nestjs/common';
import { SaveSolarPanelSystemDto } from './dto/save-solar-panel-system.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SolarPanelSystemService {
  constructor(private prismaService: PrismaService) {}

  mapSaveSolarPanelSystemDtoToSolarPanelSystem(saveSolarPanelSystemDto: SaveSolarPanelSystemDto) {
    return {
      propId: Number(saveSolarPanelSystemDto.propId),
      unknownInclineAngle: saveSolarPanelSystemDto.unknownInclineAngle,
      unknownOrientationAngle: saveSolarPanelSystemDto.unknownOrientationAngle,
      installedCapacity: Number(saveSolarPanelSystemDto.installedCapacity),
      systemLoss: Number(saveSolarPanelSystemDto.systemLoss),
      inclineAngle: Number(saveSolarPanelSystemDto.inclineAngle),
      orientationAngle: Number(saveSolarPanelSystemDto.orientationAngle),
      trackingType: saveSolarPanelSystemDto.trackingType,
      pvPanelType: saveSolarPanelSystemDto.pvPanelType,
      mountingType: saveSolarPanelSystemDto.mountingType,
    };
  }

  async save(saveSolarPanelSystemDtos: SaveSolarPanelSystemDto[]) {
    const createDtos = saveSolarPanelSystemDtos.filter((dto) => !dto.id);
    const deleteDtos = saveSolarPanelSystemDtos.filter((dto) => dto.id && dto.isDeleted);
    const updateDtos = saveSolarPanelSystemDtos.filter((dto) => dto.id && !dto.isDeleted);

    try {
      // Create new records in bulk
      if (createDtos.length > 0) {
        await this.prismaService.solarPanelSystem.createMany({
          data: createDtos.map((dto) => this.mapSaveSolarPanelSystemDtoToSolarPanelSystem(dto)),
          skipDuplicates: true,
        });
      }

      // Update existing records in parallel
      await Promise.all(
        updateDtos.map((dto) =>
          this.prismaService.solarPanelSystem.update({
            where: { id: dto.id },
            data: this.mapSaveSolarPanelSystemDtoToSolarPanelSystem(dto),
          })
        )
      );

      await this.prismaService.solarPanelSystem.deleteMany({
        where: {
          id: {
            in: deleteDtos.map((dto) => dto.id),
          },
        },
      });
    } catch (error) {
      console.error('Error saving solar panel system:', error);
      throw error; // Re-throw the error to handle it in the controller
    }
  }
}
