import { Injectable } from '@nestjs/common';
import { SaveElectricityConsumptionDto } from './dto/save-electricity-consumption.dto';
import { PrismaService } from '../prisma.service'; // Assuming UserType is defined in this file

@Injectable()
export class ElectricityConsumptionsService {
  constructor(private prismaService: PrismaService) {}

  private mapElectricityConsumption(electricityConsumption) {
    return {
      propId: Number(electricityConsumption.propId),
      year: Number(electricityConsumption.year),
      month: Number(electricityConsumption.month),
      monthlyCost: Number(electricityConsumption.monthlyCost),
      monthlyValue: Number(electricityConsumption.monthlyValue),
    };
  }

  async save(saveElectricityConsumptionsDto: SaveElectricityConsumptionDto[], user: any) {
    const createDtos = saveElectricityConsumptionsDto.filter((dto) => !dto.id);
    const deleteDtos = saveElectricityConsumptionsDto.filter((dto) => dto.id && dto.isDeleted);
    const updateDtos = saveElectricityConsumptionsDto.filter((dto) => dto.id && !dto.isDeleted);

    try {
      // Create new records in bulk
      if (createDtos.length > 0) {
        await this.prismaService.electricityConsumption.createMany({
          data: createDtos.map((dto) => this.mapElectricityConsumption(dto)),
        });
      }

      // Update existing records in parallel
      await Promise.all(
        updateDtos.map((dto) =>
          this.prismaService.electricityConsumption.update({
            where: { id: dto.id },
            data: this.mapElectricityConsumption(dto),
          })
        )
      );

      await this.prismaService.electricityConsumption.deleteMany({
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

  findAll(user: any) {
    return `This action returns all electricityConsumptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} electricityConsumption`;
  }

  update(id: number, saveElectricityConsumptionDto: SaveElectricityConsumptionDto) {
    return `This action updates a #${id} electricityConsumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} electricityConsumption`;
  }
}
