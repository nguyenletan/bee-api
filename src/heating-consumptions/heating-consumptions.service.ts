import { Injectable } from '@nestjs/common';
import { SaveHeatingConsumptionDto } from './dto/save-heating-consumption.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HeatingConsumptionsService {
  constructor(private readonly prismaService: PrismaService) {}

  mapHeatingConsumption(dto: SaveHeatingConsumptionDto) {
    return {
      propId: Number(dto.propId),
      year: Number(dto.year),
      month: Number(dto.month),
      monthlyCost: Number(dto.monthlyCost),
      monthlyValue: Number(dto.monthlyValue),
      heatType: dto.heatType,
    };
  }

  async save(saveHeatingConsumptionDto: SaveHeatingConsumptionDto[]) {
    const createDtos = saveHeatingConsumptionDto.filter((dto) => !dto.id);
    const deleteDtos = saveHeatingConsumptionDto.filter((dto) => dto.id && dto.isDeleted);
    const updateDtos = saveHeatingConsumptionDto.filter((dto) => dto.id && !dto.isDeleted);

    try {
      // Create new records in bulk
      if (createDtos.length > 0) {
        await this.prismaService.heatingConsumption.createMany({
          data: createDtos.map((dto) => this.mapHeatingConsumption(dto)),
        });
      }

      // Update existing records in parallel
      await Promise.all(
        updateDtos.map((dto) =>
          this.prismaService.heatingConsumption.update({
            where: { id: dto.id },
            data: this.mapHeatingConsumption(dto),
          })
        )
      );

      await this.prismaService.heatingConsumption.deleteMany({
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

  findAll() {
    return `This action returns all heatingConsumptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} heatingConsumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} heatingConsumption`;
  }
}
