import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from '../prisma.service';
import { equal } from 'assert';

@Injectable()
export class EquipmentsService {
  constructor(private prismaService: PrismaService) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return 'This action adds a new equipment';
  }

  findAll() {
    return `This action returns all equipments`;
  }

  findOne(id: number) {
    return this.prismaService.equipments.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        EquipmentDetail: true,
      },
    });
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
