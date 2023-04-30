import { Injectable } from '@nestjs/common';
import { CreateLightingSystemDto } from './dto/create-lighting-system.dto';
import { UpdateLightingSystemDto } from './dto/update-lighting-system.dto';

import { PrismaService } from '../prisma.service';
import { differenceInCalendarWeeks } from 'date-fns';

@Injectable()
export class LightingSystemService {
  constructor(private prismaService: PrismaService) {}

  create(createLightingSystemDto: CreateLightingSystemDto) {
    return 'This action adds a new lightingSystem';
  }

  findAll() {
    return `This action returns all lightingSystem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lightingSystem`;
  }

  async findByBuildingId(buildingId: number) {
    const result: [] = await this.prismaService.$queryRaw`
        SELECT LS.*
        FROM "Building" B
                 INNER JOIN "Property" P on B.id = P."buildingId"
                 INNER JOIN "LightingSystem" LS ON P.id = LS."propId"
        WHERE "buildingId" = ${buildingId}`;

    const tariffRate = 0.023;
    const gridEmissionRate = 0.1;
    return result.map((x: any) => {
      const energyConsumption =
        (x.numberOfBulbs *
          x.wattRatingOfBulb *
          x.numberOfDaysUsedPerWeek *
          x.numberOfHoursUsedPerDay *
          -differenceInCalendarWeeks(
            new Date(new Date().getFullYear(), 1, 1),
            new Date(new Date().getFullYear(), 12, 31),
          )) /
        1000;
      const energyCost = energyConsumption * tariffRate;
      const emissions = energyConsumption * gridEmissionRate;
      //console.log(energyConsumption);
      x.energyConsumption = energyConsumption;
      x.energyCost = energyCost;
      x.emissions = emissions;
      return x;
    });
    //return result;
  }

  update(id: number, updateLightingSystemDto: UpdateLightingSystemDto) {
    return `This action updates a #${id} lightingSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} lightingSystem`;
  }
}
