import { Injectable } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private prismaService: PrismaService) {}

  private mapPropertyData(propertyData: Property, user: any, statusId: number = 2) {
    return {
      statusId,
      editedBy: user.uid,
      name: propertyData.name,
      streetAddress: propertyData.streetNumber + propertyData.streetName,
      streetName: propertyData.streetName,
      streetNumber: propertyData.streetNumber,
      postCode: propertyData.postCode,
      state: propertyData.state,
      city: propertyData.city,
      countryCode: propertyData.countryCode,
      grossFloorArea: 0,
      grossInteriorArea: Number(propertyData.grossInteriorArea),
      grossInteriorAreaUnit: propertyData.grossInteriorAreaUnit,
      netUsableArea: Number(propertyData.netUsableArea),
      netUsableAreaUnit: propertyData.netUsableAreaUnit,
      latitude: propertyData.location?.lat,
      longitude: propertyData.location?.lng,
      completionYear: Number(propertyData.completionYear),
      buildingOrientation: propertyData.buildingOrientation,
      constructionPeriod: propertyData.constructionPeriod,
      sustainabilityRatingSchemeId: Number(propertyData.sustainabilityRatingSchemeId),
      sustainabilityRatingId: Number(propertyData.sustainabilityRatingId),
      useTypeId: Number(propertyData.useTypeId),
      photo: propertyData.photo,
      hasMajorRefurbishmentOrExtensionsDone: propertyData.hasMajorRefurbishmentOrExtensionsDone,
      latestYearForRefurbishmentOrExtension: propertyData.latestYearForRefurbishmentOrExtension,
      storeysBelowGround: Number(propertyData.storeysBelowGround),
      storeysAboveGround: Number(propertyData.storeysAboveGround),
      PropertyUser: { create: { userAuthUID: user.uid } },
      averageInternalFloorToCeilingHeight: Number(propertyData.averageInternalFloorToCeilingHeight),
    };
  }

  create(createProperty: Property) {
    console.log(createProperty);
    return 'This action adds a new property';
  }

  createPartial(createProperty: Property, user: any) {
    console.log('Create one partial property object', createProperty);
    return this.prismaService.property.create({
      data: this.mapPropertyData(createProperty, user),
    });
  }

  update(id: number, updateProperty: Property, user: any) {
    console.log('Update property', updateProperty);

    return this.prismaService.property.update({
      where: { id },
      data: this.mapPropertyData(updateProperty, user),
    });
  }

  async findAll(user: any) {
    // Define status constants for better readability
    const ACTIVE_STATUS = 2;
    const INCOMPLETE_STATUS = 3;

    try {
      // Use a type-safe approach with Prisma's query builder instead of raw SQL
      return await this.prismaService.property.findMany({
        distinct: ['id'],
        select: {
          id: true,
          name: true,
          streetAddress: true,
          photo: true,
          streetNumber: true,
          streetName: true,
          statusId: true,
        },
        where: {
          AND: [
            {
              statusId: {
                in: [ACTIVE_STATUS, INCOMPLETE_STATUS],
              },
            },
            {
              PropertyUser: {
                some: {
                  userAuthUID: user.uid,
                },
              },
            },
          ],
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (error) {
      // Add error handling
      console.error('Error fetching buildings:', error);
      throw new Error('Failed to fetch buildings');
    }
  }

  findOne(id: number) {
    return this.prismaService.property.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
