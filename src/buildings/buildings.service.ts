import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { CreateBuildingDto, ISpaceUsageGFA } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { PrismaService } from '../prisma.service';
import { AverageOperatingHours, SpaceUsage } from '@prisma/client';

@Injectable()
export class BuildingsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBuildingDto: CreateBuildingDto) {
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

    //console.log(averageOperatingHours);

    const newBuilding = await this.prismaService.building.create({
      data: {
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

        Property: {
          create: {
            streetAddress: createBuildingDto.generalBuildingInformation.address,

            postCode: createBuildingDto.generalBuildingInformation.postalCode,

            state: createBuildingDto.generalBuildingInformation.state,

            city: createBuildingDto.generalBuildingInformation.city,

            countryCode:
              createBuildingDto.generalBuildingInformation.countryCode,

            grossFloorArea: 0,

            grossInteriorArea: Number(
              createBuildingDto.generalBuildingInformation.grossInteriorArea,
            ),

            netUsableArea: Number(
              createBuildingDto.generalBuildingInformation.netUsableArea,
            ),

            latitude: createBuildingDto.generalBuildingInformation.location.lat,

            longitude:
              createBuildingDto.generalBuildingInformation.location.lng,

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
              createBuildingDto.generalBuildingInformation
                .sustainabilityRatingId,
            ),

            useTypeId: Number(
              createBuildingDto.generalBuildingInformation.useTypeId,
            ),

            photo: createBuildingDto.generalBuildingInformation.buildingPhoto,

            AverageOperatingHours: {
              create: {
                ...averageOperatingHours,
              },
            },

            SpaceUsage: {
              create: spaceUsageGFAList,
            },
          },
        },
      },
      include: {
        Property: true, // Include all posts in the returned object
      },
    });

    // console.log('newBuilding: ');
    // console.log(newBuilding);
    return newBuilding;
    //return 'This action adds a new building';
  }

  findAll() {
    return `This action returns all buildings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
