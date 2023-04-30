import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EquipmentsService {
  constructor(private prismaService: PrismaService) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return 'This action adds a new equipment';
  }

  findAll() {
    return `This action returns all equipments`;
  }

  async getProjectPeakDemand(id: number, numberOfNextDays: number) {
    const equipment = await this.prismaService.equipments.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    const historizedPoint = equipment.coolingSystemId
      ? '"CoolingHistorizedPoint"'
      : equipment.heatingSystemId
      ? '"HeatingHistorizedPoint"'
      : equipment.mechanicalVentilationSystemId
      ? '"MechanicalVentilationHistorizedPoint"'
      : '';

    return this.prismaService.$queryRawUnsafe(
      `
      SELECT avg("maxValue") average, day, month, "createdDate"
      FROM(
          (SELECT "Equipments".id, "Equipments".dis, max(CHP.value) "maxValue", 
                    date_trunc('day', CHP."createdAt") "createdDate",
                    extract(day from CHP."createdAt") as day, extract(month from CHP."createdAt") "month", extract(year from CHP."createdAt") "year"
              from "Equipments"
                   inner join "Points" p on p."equipId" = "Equipments".id
                   INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
                   inner join ${historizedPoint} CHP on p.id = CHP."pointId"
              WHERE "Equipments".id = 38 and extract(year from CHP."createdAt") = 2016
              GROUP BY "Equipments".id, "Equipments".dis, "day", "month", "year",  date_trunc('day', CHP."createdAt")
              ORDER BY "year", "month", "day")
          UNION
          (SELECT "Equipments".id, "Equipments".dis, max(CHP.value) "maxValue", 
                 date_trunc('day', CHP."createdAt") "createdDate",
                extract(day from CHP."createdAt") as day, extract(month from CHP."createdAt") "month",extract(year from CHP."createdAt") "year"
          from "Equipments"
                   inner join "Points" p on p."equipId" = "Equipments".id
                   INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
                   inner join ${historizedPoint} CHP on p.id = CHP."pointId"
          WHERE "Equipments".id = $1 and extract(year from CHP."createdAt") = 2017
          GROUP BY "Equipments".id, "Equipments".dis, "day", "month", "year",  date_trunc('day', CHP."createdAt")
          ORDER BY "year", "month", "day")
          UNION
          (SELECT "Equipments".id, "Equipments".dis, max(CHP.value) "maxValue", 
                 date_trunc('day', CHP."createdAt") "createdDate",
                extract(day from CHP."createdAt") as day, extract(month from CHP."createdAt") "month",extract(year from CHP."createdAt") "year"
          from "Equipments"
                   inner join "Points" p on p."equipId" = "Equipments".id
                   INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
                   inner join ${historizedPoint} CHP on p.id = CHP."pointId"
          WHERE "Equipments".id = $1 and extract(year from CHP."createdAt") = 2018
          GROUP BY "Equipments".id, "Equipments".dis, "day", "month", "year",  date_trunc('day', CHP."createdAt")
          ORDER BY "year", "month", "day")
          UNION
          (SELECT "Equipments".id, "Equipments".dis, max(CHP.value) "maxValue", 
                 date_trunc('day', CHP."createdAt") "createdDate",
                extract(day from CHP."createdAt") as day, extract(month from CHP."createdAt") "month",extract(year from CHP."createdAt") "year"
          from "Equipments"
                   inner join "Points" p on p."equipId" = "Equipments".id
                   INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
                   inner join ${historizedPoint} CHP on p.id = CHP."pointId"
          WHERE "Equipments".id = $1 and extract(year from CHP."createdAt") = 2019
          GROUP BY "Equipments".id, "Equipments".dis, "day", "month", "year", date_trunc('day', CHP."createdAt")
          ORDER BY "year", "month", "day")
          UNION
          (SELECT "Equipments".id, "Equipments".dis, max(CHP.value) "maxValue", 
                date_trunc('day', CHP."createdAt") "createdDate",
                extract(day from CHP."createdAt") as day, extract(month from CHP."createdAt") "month",extract(year from CHP."createdAt") "year"
          from "Equipments"
                   inner join "Points" p on p."equipId" = "Equipments".id
                   INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
                   inner join ${historizedPoint} CHP on p.id = CHP."pointId"
          WHERE "Equipments".id = $1 and extract(year from CHP."createdAt") = 2020
          GROUP BY "Equipments".id, "Equipments".dis, "day", "month", "year",  date_trunc('day', CHP."createdAt")
          ORDER BY "year", "month", "day")
          UNION
          (SELECT "Equipments".id, "Equipments".dis, max(CHP.value) "maxValue", 
                 date_trunc('day', CHP."createdAt") "createdDate",
                extract(day from CHP."createdAt") as day, extract(month from CHP."createdAt") "month",extract(year from CHP."createdAt") "year"
          from "Equipments"
                   inner join "Points" p on p."equipId" = "Equipments".id
                   INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
                   inner join ${historizedPoint} CHP on p.id = CHP."pointId"
          WHERE "Equipments".id = $1 and extract(year from CHP."createdAt") = 2021
          GROUP BY "Equipments".id, "Equipments".dis, "day", "month", "year",  date_trunc('day', CHP."createdAt")
          ORDER BY "year", "month", "day")) as A
      WHERE "createdDate" >= CURRENT_DATE AND "createdDate" <= CURRENT_DATE + '${numberOfNextDays} day'::INTERVAL
      GROUP BY month, day, "createdDate"
      ORDER BY month, day asc
    `,
      id,
    );
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
        R_EquipmentTypes: true,
        Property: true,
        CoolingSystem: true,
        HeatingSystem: true,
        MechanicalVentilationSystem: true,
      },
    });
  }

  async getEnergyConsumptionPercentage(
    equipmentId: number,
    equipmentType: number,
    subSystemId: number,
    buildingId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const equipment = await this.prismaService.equipments.findFirst({
      where: {
        id: {
          equals: equipmentId,
        },
      },
    });

    const historizedPoint = equipment.coolingSystemId
      ? '"CoolingHistorizedPoint"'
      : equipment.heatingSystemId
      ? '"HeatingHistorizedPoint"'
      : equipment.mechanicalVentilationSystemId
      ? '"MechanicalVentilationHistorizedPoint"'
      : '';

    const subsystemName = equipment.coolingSystemId
      ? '"CoolingSystem"'
      : equipment.heatingSystemId
      ? '"HeatingSystem"'
      : equipment.mechanicalVentilationSystemId
      ? '"MechanicalVentilationSystem"'
      : '';

    const subsystemId = equipment.coolingSystemId
      ? '"coolingSystemId"'
      : equipment.heatingSystemId
      ? '"heatingSystemId"'
      : equipment.mechanicalVentilationSystemId
      ? '"mechanicalVentilationSystemId"'
      : '';

    if (historizedPoint === '') {
      return [];
    }

    return this.prismaService.$queryRawUnsafe(
      `
      SELECT "equipmentConsumption",
         "buidlingConsumption",
         "subSystemConsumption",
         "equipmentTypeConsumption",
         (("equipmentConsumption" * 100) / "buidlingConsumption") "percentageOfBuilding",
         (("equipmentConsumption" * 100) / "subSystemConsumption") "percentageOfSubSystem",
         (("equipmentConsumption" * 100) / "equipmentTypeConsumption") "percentageOfEquipmentType"
      FROM (
         SELECT sum(HP.value) / 1000 as "equipmentConsumption"
         FROM "Equipments" E
                  INNER JOIN "Points" P on E.id = P."equipId"
                  INNER JOIN ${historizedPoint} HP on P.id = HP."pointId"
         WHERE E.id = $1
           and HP."createdAt" >= $5
           and HP."createdAt" <= $6) as EC,
    
         (SELECT sum(HP.value) / 1000 as "buidlingConsumption"
          FROM "Building" b
                   INNER JOIN "Property" P on b.id = P."buildingId"
                   INNER JOIN "OverallHistorizedPoint" HP on P.id = HP."propId"
          WHERE b.id = $4
            and HP."createdAt" >= $5
            and HP."createdAt" <= $6) as BC,
         --equipmentTypeConsumption
         (SELECT (sum(HP.value) / 1000) as "subSystemConsumption"
          FROM ${historizedPoint} HP
                   INNER JOIN "Points" P on P.id = HP."pointId"
                   INNER JOIN "Equipments" E on E.id = P."equipId"
                   INNER JOIN ${subsystemName} CS on CS.id = E.${subsystemId}
          WHERE ${subsystemId} = $3
            and HP."createdAt" >= $5
            and HP."createdAt" <= $6) as ssc,
         (SELECT (sum(HP.value) / 1000) as "equipmentTypeConsumption"
          FROM ${historizedPoint} HP
                   INNER JOIN "Points" P on P.id = HP."pointId"
                   INNER JOIN "Equipments" E on E.id = P."equipId"
                   INNER JOIN "Property" P2 on P2.id = E."propertyId"
                   INNER JOIN "Building" B on B.id = P2."buildingId"
          WHERE "equipTypeId" = $2
            and B.id = $4
            and HP."createdAt" >= $5
            and HP."createdAt" <= $6) as etc
      `,
      equipmentId,
      equipmentType,
      subSystemId,
      buildingId,
      startDate,
      endDate,
    );
  }

  async getEnergyConsumptionByIdAndGroupByYear(id: number) {
    const equipment = await this.prismaService.equipments.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (equipment) {
      const historizedPoint = equipment.coolingSystemId
        ? '"CoolingHistorizedPoint"'
        : equipment.heatingSystemId
        ? '"HeatingHistorizedPoint"'
        : equipment.mechanicalVentilationSystemId
        ? '"MechanicalVentilationHistorizedPoint"'
        : '';
      if (historizedPoint === '') {
        return [];
      }

      return this.prismaService.$queryRawUnsafe(
        `
            SELECT "Equipments".id,
              "Equipments".dis,
              sum(CHP.value),
              extract(year from CHP."createdAt") as "year"
            from "Equipments"
              inner join "Points" p on p."equipId" = "Equipments".id
              INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
              inner join ${historizedPoint} CHP on p.id = CHP."pointId"
            WHERE "Equipments".id = $1
            GROUP BY "Equipments".id, "Equipments".dis, "year"
            ORDER BY "year" asc`,
        id,
      );
    }
    return null;
  }

  async getEnergyConsumption(id: number, startDate: Date, endDate: Date) {
    const equipment = await this.prismaService.equipments.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (equipment) {
      const historizedPoint = equipment.coolingSystemId
        ? '"CoolingHistorizedPoint"'
        : equipment.heatingSystemId
        ? '"HeatingHistorizedPoint"'
        : equipment.mechanicalVentilationSystemId
        ? '"MechanicalVentilationHistorizedPoint"'
        : '';
      if (historizedPoint === '') {
        return [];
      }

      return this.prismaService.$queryRawUnsafe(
        `
            SELECT "Equipments".id,
              "Equipments".dis,
              sum(CHP.value),
              date_trunc('day', CHP."createdAt") as "day",
              extract(year from CHP."createdAt") as "year"
            from "Equipments"
              inner join "Points" p on p."equipId" = "Equipments".id
              INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
              inner join ${historizedPoint} CHP on p.id = CHP."pointId"
            WHERE CHP."createdAt" >= $1 and CHP."createdAt" <= $2 and "Equipments".id = $3
            GROUP BY "Equipments".id, "Equipments".dis, "day", "year"`,
        startDate,
        endDate,
        id,
      );
    }
    return null;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
