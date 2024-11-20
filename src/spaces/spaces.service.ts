import { Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SpacesService {
  constructor(private prismaService: PrismaService) {}

  create(createSpaceDto: CreateSpaceDto) {
    return this.prismaService.space.create({
      data: createSpaceDto,
    });
  }

  findAll() {
    return this.prismaService.space.findMany();
  }

  findAllByProperty(propId: number) {
    return this.prismaService.space.findMany({
      where: {
        propId,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.space.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return this.prismaService.space.update({
      where: {
        id,
      },
      data: updateSpaceDto,
    });
  }

  remove(id: number) {
    return this.prismaService.space.delete({
      where: {
        id,
      },
    });
  }
}
