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

  getEnergyConsumptionPercentage(
    equipmentId: number,
    equipmentType: number,
    subSystemId: number,
    buildingId: number,
    startDate: Date,
    endDate: Date,
  ) {
    console.log('startDate: ');
    console.log(startDate);
    console.log('endDate: ');
    console.log(endDate);

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
                  INNER JOIN "CoolingHistorizedPoint" HP on P.id = HP."pointId"
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
          FROM "CoolingHistorizedPoint" HP
                   INNER JOIN "Points" P on P.id = HP."pointId"
                   INNER JOIN "Equipments" E on E.id = P."equipId"
                   INNER JOIN "CoolingSystem" CS on CS.id = E."coolingSystemId"
          WHERE "coolingSystemId" = $3
            and HP."createdAt" >= $5
            and HP."createdAt" <= $6) as ssc,
         (SELECT (sum(HP.value) / 1000) as "equipmentTypeConsumption"
          FROM "CoolingHistorizedPoint" HP
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

  async getEnergyConsumption(id: number, startDate: Date, endDate: Date) {
    const equipment = await this.prismaService.equipments.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    console.log('startDate');
    console.log(startDate);

    console.log('endDate');
    console.log(endDate);
    if (equipment) {
      // const differenceDays = differenceInCalendarDays(endDate, startDate);
      // console.log(differenceDays);

      const historizedPoint = equipment.coolingSystemId
        ? '"CoolingHistorizedPoint"'
        : equipment.heatingSystemId
        ? '"HeatingHistorizedPoint"'
        : equipment.mechanicalVentilationSystemId
        ? '"mechanicalVentilationSystemId"'
        : '';
      if (historizedPoint === '') {
        return [];
      }

      console.log(historizedPoint);

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

      // return this.prismaService.$queryRaw`
      //       SELECT "Equipments".id,
      //         "Equipments".dis,
      //         sum(CHP.value),
      //         extract(year from CHP."createdAt") as year
      //       from "Equipments"
      //         inner join "Points" p on p."equipId" = "Equipments".id
      //         INNER JOIN "R_EquipmentTypes" RET on RET.id = "Equipments"."equipTypeId"
      //         inner join "CoolingHistorizedPoint" CHP on p.id = CHP."pointId"
      //       WHERE CHP."createdAt" >= ${startDate} and CHP."createdAt" <= ${endDate} and "Equipments".id = ${id}
      //       GROUP BY "Equipments".id, "Equipments".dis, "year"`;
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
