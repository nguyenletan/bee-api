import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {}
  async keepTrack(externalUID: string) {
    this.prismaService.userTracking.create({
      data: {
        externalId: externalUID,
      },
    });
  }
}
