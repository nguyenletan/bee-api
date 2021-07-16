import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BuildingsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBuildingDto: CreateBuildingDto) {
    //console.log(createBuildingDto);

    if (
      await this.prismaService.building.findUnique({
        where: {
          name: createBuildingDto.generalBuildingInformation.buildingName,
        },
      })
    ) {
      console.log('Existing building');
      throw new HttpException('Existing building', 406);
    }

    return await this.prismaService.building.create({
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
          create: [
            {
              streetAddress:
                createBuildingDto.generalBuildingInformation.address,

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

              latitude:
                createBuildingDto.generalBuildingInformation.location.lat,

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
            },
          ],
        },
      },
    });
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
