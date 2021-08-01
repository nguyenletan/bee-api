import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import {
  CreateBuildingDto,
  IElectricityConsumption,
  ILightingSubSystem,
  ISolarPanelSystem,
  ISpaceUsageGFA,
} from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from '../prisma.service';
import {
  AverageOperatingHours,
  ElectricityConsumption,
  LightingSystem,
  SolarPanelSystem,
  SpaceUsage,
} from '@prisma/client';
import { Utilities } from '../shared/utilities';

@Injectable()
export class BuildingsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBuildingDto: CreateBuildingDto, user: any) {
    //console.log(createBuildingDto);

    // if (
    //   await this.prismaService.building.findUnique({
    //     where: {
    //       name: createBuildingDto.generalBuildingInformation.buildingName,
    //     },
    //   })
    // ) {
    //   console.log('Existing building');
    //   throw new HttpException('Existing building', 406);
    // }

    /// mapping for averageOperatingHours
    const averageOperatingHours: AverageOperatingHours = <
      AverageOperatingHours
    >{};

    for (const item of createBuildingDto?.buildingActivity) {
      if (item.isEnable) {
        averageOperatingHours[item.codeName + 'Start'] = format(
          new Date(item.startTime),
          'HH:mm',
        );
        averageOperatingHours[item.codeName + 'End'] = format(
          new Date(item.endTime),
          'HH:mm',
        );
      } else {
        averageOperatingHours[item.codeName + 'Start'] = null;
        averageOperatingHours[item.codeName + 'End'] = null;
      }
    }

    const electricityConsumptionList =
      createBuildingDto?.electricityConsumptionList.map(
        (item: IElectricityConsumption) => {
          return <ElectricityConsumption>{
            month: item.month,
            year: item.year,
            monthlyValue: Number(item.value),
            monthlyCost: Number(item.cost),
          };
        },
      );

    const lightingSubSystemList = createBuildingDto?.lightingSubSystemList.map(
      (item: ILightingSubSystem) => {
        return <LightingSystem>{
          lightingFittingTypeId: item.indoorLightingSystemTypeId,
          percentageOfFittingTypeUsed: Number(item.percentage),
        };
      },
    );

    const spaceUsageGFAList = createBuildingDto?.spaceUsageGFAList.map(
      (item: ISpaceUsageGFA) => {
        return <SpaceUsage>{
          usageTypeId: item.typeId,
          usagePercentage: item.percentage,
          climateControlId: item.climateControlId,
          title: item.title,
          fanTypeId: item.fanTypeId,
          hasReheatRecovery: item.hasReheatRecovery,
        };
      },
    );

    const solarPanelSystemList = createBuildingDto?.solarPanelSystemList.map(
      (item: ISolarPanelSystem) => {
        const solarPanelSystem = <SolarPanelSystem>{
          systemLoss: item.systemLoss,
          installedCapacity: Number(item.installedCapacity),
          pvTechChoiceId: item.pvTechChoiceId,
          inclineAngle:
            item.trackingTypeId === 1 || item.trackingTypeId === 2
              ? item.inclineAngel
              : null,
          trackingTypeId: item.trackingTypeId,
          mountingTypeId: item.mountingTypeId,
          orientationAngle:
            item.trackingTypeId === 1 || item.trackingTypeId === 3
              ? item.orientationAngle
              : null,
        };

        return solarPanelSystem;
      },
    );

    // console.log('newBuilding: ');
    // console.log(newBuilding);
    const addingBuildingObject = {
      name: createBuildingDto.generalBuildingInformation.buildingName,

      storeysBelowGround: Number(
        createBuildingDto.generalBuildingInformation.storeysBelowGround,
      ),

      storeysAboveGround: Number(
        createBuildingDto.generalBuildingInformation.storeysAboveGround,
      ),

      numberOfFloorAboveGroundLvl: 0,

      numberOfFloorBelowGroundLvl: 0,

      buildingMajorOrientationId: 1,

      averageInternalFloorToCeilingHeight: Number(
        createBuildingDto.generalBuildingInformation
          .avgInternalFloorToCeilingHeight,
      ),

      averageInternalFloorToCeilingHeightUnit:
        createBuildingDto.generalBuildingInformation
          .avgInternalFloorToCeilingHeightUnit,

      Property: {
        create: {
          streetAddress: createBuildingDto.generalBuildingInformation.address,

          postCode: createBuildingDto.generalBuildingInformation.postalCode,

          state: createBuildingDto.generalBuildingInformation.state,

          city: createBuildingDto.generalBuildingInformation.city,

          countryCode: createBuildingDto.generalBuildingInformation.countryCode,

          grossFloorArea: 0,

          grossInteriorArea: Number(
            createBuildingDto.generalBuildingInformation.grossInteriorArea,
          ),

          grossInteriorAreaUnit:
            createBuildingDto.generalBuildingInformation.grossInteriorAreaUnit,

          netUsableArea: Number(
            createBuildingDto.generalBuildingInformation.netUsableArea,
          ),

          netUsableAreaUnit:
            createBuildingDto.generalBuildingInformation.netUsableAreaUnit,

          latitude: createBuildingDto.generalBuildingInformation.location?.lat,

          longitude: createBuildingDto.generalBuildingInformation.location?.lng,

          majorOrientationId:
            createBuildingDto.generalBuildingInformation.buildingOrientedId,

          completionYear: Number(
            createBuildingDto.generalBuildingInformation
              .constructionPeriodValue,
          ),

          sustainabilityRatingSchemeId: Number(
            createBuildingDto.generalBuildingInformation
              .sustainabilityRatingSchemeId,
          ),

          sustainabilityRatingId: Number(
            createBuildingDto.generalBuildingInformation.sustainabilityRatingId,
          ),

          useTypeId: Number(
            createBuildingDto.generalBuildingInformation.useTypeId,
          ),

          photo: createBuildingDto.generalBuildingInformation.buildingPhoto,

          hasMajorRefurbishmentOrExtensionsDone:
            createBuildingDto.generalBuildingInformation
              .hasMajorRefurbishmentOrExtensionsDone,

          latestYearForRefurbishmentOrExtension:
            createBuildingDto.generalBuildingInformation
              .latestYearForRefurbishmentOrExtension,

          AverageOperatingHours: {
            create: {
              ...averageOperatingHours,
            },
          },

          SpaceUsage: {
            create: spaceUsageGFAList,
          },

          ElectricityConsumption: {
            create: electricityConsumptionList,
          },

          LightingSystem: {
            create: lightingSubSystemList,
          },

          ExternalEnvelopeSubSystem: {
            create: {
              externalWindowToWallRatio:
                createBuildingDto.envelopFacade.externalWindowToWallRatio,
              roofInsulationTypeId:
                createBuildingDto.envelopFacade.externalRoofInsulationTypeId,
              externalGroundInsulationTypeId:
                createBuildingDto.envelopFacade
                  .externalGroundFloorInsulationTypeId,
            },
          },

          SolarPanelSystem: {
            create: solarPanelSystemList,
          },

          PropertyUser: {
            create: {
              userAuthUID: user.uid,
            },
          },
        },
      },
    };

    if (createBuildingDto.coolingSystem.hasCoolingSystem) {
      addingBuildingObject.Property.create = <any>{
        ...addingBuildingObject.Property.create,
        CoolingSystem: {
          create: {
            coolingSystemTypeId:
              createBuildingDto.coolingSystem.coolingSystemTypeId,
            Chiller: {
              create: {
                compressorTypeId:
                  createBuildingDto.coolingSystem.compressorTypeId,
                refrigerantTypeId:
                  createBuildingDto.coolingSystem.refrigerantTypeId,
                chillerEnergySourceTypeId:
                  createBuildingDto.coolingSystem.chillerEnergySourceTypeId,
              },
            },
          },
        },
      };
    }

    if (createBuildingDto.heatingSystem.hasHeatingSystem) {
      addingBuildingObject.Property.create = <any>{
        ...addingBuildingObject.Property.create,
        HeatingSystem: {
          create: {
            heatingSystemTypeId:
              createBuildingDto.heatingSystem.heatingSystemTypeId,
            Heater: {
              create: {
                heaterTypeId: createBuildingDto.heatingSystem.heaterTypeId,
                heaterEnergySourceId:
                  createBuildingDto.heatingSystem.heaterEnergySourceTypeId,
              },
            },
          },
        },
      };
    }

    //console.log(addingBuildingObject);
    //return addingBuildingObject;

    return await this.prismaService.building.create({
      data: addingBuildingObject,
      include: {
        Property: true, // Include all posts in the returned object
      },
    });
    //return 'This action adds a new building';
  }

  async findAll(user: any) {
    const result = await this.prismaService.$queryRaw`
        SELECT p."streetAddress", p.photo, p.id, B.name FROM "Property" p
        INNER JOIN "PropertyUser" PU ON p.id = PU."propertyId"
        INNER JOIN "Building" B on B.id = p."buildingId"
        WHERE "statusId" = 2 AND PU."userAuthUID" = ${user.uid} AND "buildingId" is not null`;
    // return await this.prismaService.property.findMany({
    //   where: {
    //     statusId: {
    //       equals: 2,
    //     },
    //     PropertyUser: {
    //       userAuthUID : {
    //         equals: ''
    //       }
    //     }
    //   },
    // });
    console.log(result);
    return result;
  }

  async findOne(id: number) {
    const prop = await this.prismaService.$queryRaw`
        SELECT p.*, B.*, UT.name as "useTypeName",
              SR.name as "sustainabilityRatingName",
              SRS.name as "sustainabilityRatingSchemeName"
        FROM "Property" p
          INNER JOIN "Building" B on B.id = p."buildingId"
          INNER JOIN "UseType" UT on UT.id = p."useTypeId"
          INNER JOIN "SustainabilityRatingScheme" SRS on SRS.id = p."sustainabilityRatingSchemeId"
          INNER JOIN "SustainabilityRating" SR on SR.id = p."sustainabilityRatingId"
        WHERE "statusId" = 2 AND p.id = ${id}`;
    let totalCost = 0;
    let totalConsumption = 0;

    const electricConsumptions =
      await this.prismaService.electricityConsumption.findMany({
        where: {
          propId: {
            equals: id,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });

    for (const i of electricConsumptions) {
      totalCost += i.monthlyCost;
      totalConsumption += i.monthlyValue;
    }

    return {
      totalCost: totalCost,
      totalConsumption: totalConsumption / 1000,
      prop: prop[0],
      electricConsumptions: electricConsumptions,
    };
    //return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
