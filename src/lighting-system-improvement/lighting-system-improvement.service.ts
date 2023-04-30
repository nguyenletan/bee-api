import { Injectable } from '@nestjs/common';
import { CreateLightingSystemImprovementDto } from './dto/create-lighting-system-improvement.dto';
import { UpdateLightingSystemImprovementDto } from './dto/update-lighting-system-improvement.dto';
import { LightingSystemImprovementDto } from './dto/lighting-system-improvement.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LightingSystemImprovementService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(
    lightingSystemImprovementDto: LightingSystemImprovementDto[],
  ) {
    const data = lightingSystemImprovementDto.map((l) => {
      return {
        costOfEachBulb: l.costPerBulb,
        numberOfBulbs: l.numberOfReplacingBulbs,
        numberOfDaysPerWeek: l.numberOfDaysUsedPerWeek,
        numberOfHoursPerDay: l.numberOfHoursUsedPerDay,
        lightSystemId: l.id,
        wattRating: l.wattRatingOfBulb,
        userExternalId: l.userExternalId
      };
    });

    console.log(data);

    const lightingSystemImprovement =
      await this.prismaService.lightingSystemImprovement.createMany({
        data: data,
      });

    console.log('lightingSystemImprovement: ', lightingSystemImprovement);

    return lightingSystemImprovement;
  }

  findAll() {
    return `This action returns all lightingSystemImprovement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lightingSystemImprovement`;
  }

  update(
    updateLightingSystemImprovementDto: UpdateLightingSystemImprovementDto[],
  ) {
    return `This action updates a  lightingSystemImprovement`;
  }

  remove(id: number) {
    return `This action removes a #${id} lightingSystemImprovement`;
  }
}
