import { Injectable } from '@nestjs/common';
import { CreateLightingSystemDto } from './dto/create-lighting-system.dto';
import { UpdateLightingSystemDto } from './dto/update-lighting-system.dto';

import { PrismaService } from '../prisma.service';

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

  findByBuildingId(buildingId: number) {
    return this.prismaService.$queryRaw`
        SELECT LS.*
        FROM "Building" B INNER JOIN "Property" P on B.id = P."buildingId"
                          INNER JOIN "LightingSystem" LS ON P.id = LS."propId"
        WHERE "buildingId" = ${buildingId}`;
  }

  update(id: number, updateLightingSystemDto: UpdateLightingSystemDto) {
    return `This action updates a #${id} lightingSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} lightingSystem`;
  }
}
