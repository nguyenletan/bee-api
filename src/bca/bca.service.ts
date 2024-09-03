import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { withAccelerate } from '@prisma/extension-accelerate';
import { LONG_CACHE_STRATEGY } from '../shared/constants';

@Injectable()
export class BcaService {
  constructor(private prismaService: PrismaService) {}

  findAllCivicCommunityCulturalInstitution() {
    return this.prismaService.$extends(withAccelerate()).bCA_CivicCommunityCulturalInstitution.findMany({
      cacheStrategy: LONG_CACHE_STRATEGY,
    });
  }

  findAllEducationalInstitution() {
    return this.prismaService.$extends(withAccelerate()).bCA_EducationalInstitution.findMany({
      cacheStrategy: LONG_CACHE_STRATEGY,
    });
  }

  findAllCommercialBuilding() {
    return this.prismaService.$extends(withAccelerate()).bCA_CommercialBuilding.findMany({
      cacheStrategy: LONG_CACHE_STRATEGY,
    });
  }

  findAllHealthcareFacility() {
    return this.prismaService.$extends(withAccelerate()).bCA_HealthcareFacility.findMany({
      cacheStrategy: LONG_CACHE_STRATEGY,
    });
  }

  findAllSportRecreationCentre() {
    return this.prismaService.$extends(withAccelerate()).bCA_SportRecreationCentre.findMany({
      cacheStrategy: LONG_CACHE_STRATEGY,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bca`;
  }
}
