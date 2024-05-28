import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { withAccelerate } from '@prisma/extension-accelerate';
import { SHORT_TIME_CACHE_STRATEGY } from '../shared/constants';
import * as _ from 'lodash';
import { IEquipmentTypeGroup } from '../shared/types/iEquipmentTypeGroup';
import { IEquipmentGroup } from '../shared/types/iEquipmentGroup';

@Injectable()
export class HistorizedPointsService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return `This action returns all historizedPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historizedPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} historizedPoint`;
  }

  findAllOverallHistorizedPointsByPropertyId(propId: number) {
    this.prismaService
      .$extends(withAccelerate())
      .overallHistorizedPoint.findMany({
        where: {
          propId: {
            equals: propId,
          },
        },
        orderBy: {
          id: 'asc',
        },
        cacheStrategy: SHORT_TIME_CACHE_STRATEGY,
      });
  }

  getOverallHistorizedPointsByPropertyIdAndGroupByYear(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year
        from "OverallHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year"
        order by "year"`;
  }

  async getOverallHistorizedPointsByPropertyIdAndGroupByQuarter(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(quarter from "createdAt") as quarter, extract(year from "createdAt") as year
        from "OverallHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "quarter"
        order by "year" , "quarter"`;
  }

  async getOverallHistorizedPointsByPropertyIdAndGroupByMonth(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year, extract(month from "createdAt") as month
        from "OverallHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "month"
        order by "year" asc, "month" asc`;
  }

  async getOverallHistorizedPointsByPropertyIdAndGroupByWeek(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year, extract(week from "createdAt") as week
        from "OverallHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "week"
        order by "year" asc, "week" asc;`;
  }

  async getOverallHistorizedPointsByPropertyIdAndGroupByDay(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year, extract(month from "createdAt") as month, extract(day from "createdAt") as day
        from "OverallHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "day", "month"
        order by "year" asc, "month", "day" asc`;
  }

  async getCoolingHistorizedPointsByPropertyIdAndGroupByYear(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year
        from "CoolingHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year"
        order by "year"`;
  }

  async getCoolingHistorizedPointsByPropertyIdAndGroupByQuarter(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(quarter from "createdAt") as quarter, extract(year from "createdAt") as year
        from "CoolingHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "quarter"
        order by "year" , "quarter"`;
  }

  async getCoolingHistorizedPointsByPropertyIdAndGroupByMonth(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year, extract(month from "createdAt") as month
        from "CoolingHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "month"
        order by "year" asc, "month" asc`;
  }

  async getCoolingHistorizedPointsByPropertyIdAndGroupByWeek(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year, extract(week from "createdAt") as week
        from "CoolingHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "week"
        order by "year" asc, "week" asc;`;
  }

  async getCoolingHistorizedPointsByPropertyIdAndGroupByDay(
    propId: number,
    startDay: Date,
    endDay: Date,
  ) {
    return this.prismaService.$queryRaw`
        select sum(value) as value, extract(year from "createdAt") as year, extract(month from "createdAt") as month, extract(day from "createdAt") as day
        from "CoolingHistorizedPoint" c
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}
        group by "year", "day", "month"
        order by "year" asc, "month", "day" asc`;
  }

  async sumAllCoolingHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<number> {
    // console.log('propId:');
    // console.log(propId);
    return this.prismaService.$queryRaw`
        select sum(value) from "CoolingHistorizedPoint"
         where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}`;
  }

  async getAllEquipmentTypeOfCoolingHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<IEquipmentTypeGroup[]> {
    const equipmentTypeQueryResult: IEquipmentTypeGroup[] = await this
      .prismaService.$queryRaw`
      select et."id", et.name, "propId", sum(c.value) 
      from "CoolingHistorizedPoint" c
        inner join "Points" P on P.id = c."pointId"
        inner join "Equipments" E on E.id = P."equipId"
        inner join "R_EquipmentTypes" et on et.id = e."equipTypeId"
      where "propId" = ${propId} and c."createdAt" >= ${startDay} and c."createdAt" <= ${endDay}
      group by "propId", et."id", et.name`;

    const equipmentQueryResult: IEquipmentGroup[] = await this.prismaService
      .$queryRaw`
      select et."id" as "typeId", et.name as "typeName", E."equipId", E.id as id, E.dis as name, "propId", sum(c.value)
      from "CoolingHistorizedPoint" c
        inner join "Points" P on P.id = c."pointId"
        inner join "Equipments" E on E.id = P."equipId"
        inner join "R_EquipmentTypes" et on et.id = e."equipTypeId"
      where "propId" = ${propId} and c."createdAt" >= ${startDay} and c."createdAt" <= ${endDay}
      group by "propId", et."id", et.name, E.id, E."equipId", E.dis`;

    for (const equipmentType of equipmentTypeQueryResult) {
      equipmentType.equipmentGroups = _.filter(equipmentQueryResult, [
        'typeName',
        equipmentType.name,
      ]);
    }

    //console.log(equipmentTypeQueryResult);
    //console.log('equipmentQueryResult: ');
    //console.log(equipmentQueryResult);
    return equipmentTypeQueryResult;
  }

  async sumAllHeatingHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<number> {
    return this.prismaService.$queryRaw`
        select sum(value) from "HeatingHistorizedPoint"
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}`;
  }

  async getAllEquipmentTypeOfHeatingHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<IEquipmentTypeGroup[]> {
    console.log(propId);
    const equipmentTypeQueryResult: IEquipmentTypeGroup[] = await this
      .prismaService.$queryRaw`
      select et."id", et.name, "propId", sum(c.value) 
      from "HeatingHistorizedPoint" c
        inner join "Points" P on P.id = c."pointId"
        inner join "Equipments" E on E.id = P."equipId"
        inner join "R_EquipmentTypes" et on et.id = e."equipTypeId"
      where "propId" = ${propId} and c."createdAt" >= ${startDay} and c."createdAt" <= ${endDay}
      group by "propId", et."id", et.name`;

    const equipmentQueryResult: IEquipmentGroup[] = await this.prismaService
      .$queryRaw`
      select et."id" as "typeId", et.name as "typeName", E.id, E."equipId", E.id as id, E.dis as name, "propId", sum(c.value)
      from "HeatingHistorizedPoint" c
        inner join "Points" P on P.id = c."pointId"
        inner join "Equipments" E on E.id = P."equipId"
        inner join "R_EquipmentTypes" et on et.id = e."equipTypeId"
      where "propId" = ${propId} and c."createdAt" >= ${startDay} and c."createdAt" <= ${endDay}
      group by "propId", et."id", et.name, E.id, E."equipId", E.dis`;

    for (const equipmentType of equipmentTypeQueryResult) {
      equipmentType.equipmentGroups = _.filter(equipmentQueryResult, [
        'typeName',
        equipmentType.name,
      ]);
    }

    // console.log(equipmentTypeQueryResult);
    // console.log(equipmentQueryResult);
    return equipmentTypeQueryResult;
  }

  async sumAllLightingHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<number> {
    return this.prismaService.$queryRaw(Prisma.sql`
        select sum(value) from "LightingHistorizedPoint"
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}`);
  }

  async sumAllOverallHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<number> {
    return this.prismaService.$queryRaw`
        select sum(value) from "OverallHistorizedPoint"
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}`;
  }

  async sumAllMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<number> {
    return this.prismaService.$queryRaw`
        select sum(value) from "MechanicalVentilationHistorizedPoint"
        where "propId" = ${propId} and "createdAt" >= ${startDay} and "createdAt" <= ${endDay}`;
  }

  async getAllEquipmentTypeOfMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
    propId: number,
    startDay: Date,
    endDay: Date,
  ): Promise<IEquipmentTypeGroup[]> {
    const equipmentTypeQueryResult: IEquipmentTypeGroup[] = await this
      .prismaService.$queryRaw`
      select et."id", et.name, "propId", sum(c.value) 
      from "MechanicalVentilationHistorizedPoint" c
        inner join "Points" P on P.id = c."pointId"
        inner join "Equipments" E on E.id = P."equipId"
        inner join "R_EquipmentTypes" et on et.id = e."equipTypeId"
      where "propId" = ${propId} and c."createdAt" >= ${startDay} and c."createdAt" <= ${endDay}
      group by "propId", et."id", et.name`;

    const equipmentQueryResult: IEquipmentGroup[] = await this.prismaService
      .$queryRaw`
      select et."id" as "typeId", et.name as "typeName", E."equipId", E.id as id, E.dis as name, "propId", sum(c.value)
      from "MechanicalVentilationHistorizedPoint" c
        inner join "Points" P on P.id = c."pointId"
        inner join "Equipments" E on E.id = P."equipId"
        inner join "R_EquipmentTypes" et on et.id = e."equipTypeId"
      where "propId" = ${propId} and c."createdAt" >= ${startDay} and c."createdAt" <= ${endDay}
      group by "propId", et."id", et.name, E.id, E."equipId", E.dis`;

    for (const equipmentType of equipmentTypeQueryResult) {
      equipmentType.equipmentGroups = _.filter(equipmentQueryResult, [
        'typeName',
        equipmentType.name,
      ]);
    }

    // console.log(equipmentTypeQueryResult);
    // console.log(equipmentQueryResult);
    return equipmentTypeQueryResult;
  }

  // async getMaxDayAndMinDayOfLightingHistorizedPointsByPropertyId(propId: number): Promise<{minDate: Date, maxDate: Date}> {
  //   const minMax = await this.prismaService.$queryRaw`
  //   SELECT MAX("createdAt"), min("createdAt") FROM "LightingHistorizedPoint"
  //   WHERE "propId" = 143`;

  // }
}
