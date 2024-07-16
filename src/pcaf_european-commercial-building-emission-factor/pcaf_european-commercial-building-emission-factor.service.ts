import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { withAccelerate } from '@prisma/extension-accelerate';
import { LONG_CACHE_STRATEGY } from '../shared/constants';

@Injectable()
export class PCAF_EuropeanCommercialBuildingEmissionFactorService {
  constructor(private prismaService: PrismaService) {}

  // findAll() {
  //   this.prismaService.pCAF_EuropeanCommercialBuildingEmissionFactor.findMany();
  //   return `This action returns all pcafEuropeanCommercialBuildingEmissionFactor`;
  // }
  //
  // findAllBySourceName(sourceName: string) {
  //   return this.prismaService
  //     .$extends(withAccelerate())
  //     .pCAF_EuropeanCommercialBuildingEmissionFactor.findMany({
  //       where: {
  //         sourceName: sourceName,
  //       },
  //       cacheStrategy: LONG_CACHE_STRATEGY,
  //     });
  // }
  //
  // findAllBySourceAndBuildingType(sourceName: string, buildingType: string) {
  //   return this.prismaService
  //     .$extends(withAccelerate())
  //     .pCAF_EuropeanCommercialBuildingEmissionFactor.findMany({
  //       where: {
  //         sourceName: sourceName,
  //         buildingType: buildingType,
  //       },
  //       cacheStrategy: LONG_CACHE_STRATEGY,
  //     });
  // }
  //
  // findAllBySourceNameAndCountry(sourceName: string, country: string) {
  //   return this.prismaService
  //     .$extends(withAccelerate())
  //     .pCAF_EuropeanCommercialBuildingEmissionFactor.findMany({
  //       where: {
  //         sourceName: sourceName,
  //         country: country,
  //       },
  //       cacheStrategy: LONG_CACHE_STRATEGY,
  //     });
  // }
  //
  // findOne(id: number) {
  //   return this.prismaService
  //     .$extends(withAccelerate())
  //     .pCAF_EuropeanCommercialBuildingEmissionFactor.findMany({
  //       where: {
  //         id: id,
  //       },
  //       cacheStrategy: LONG_CACHE_STRATEGY,
  //     });
  // }
}
