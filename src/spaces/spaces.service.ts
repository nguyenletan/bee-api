import { Injectable } from '@nestjs/common';
import { SaveSpaceDto } from './dto/save-space.dto';
import { PrismaService } from '../prisma.service';
import { SaveOperationHoursDto } from 'src/operation-hours/dto/save-operation-hours.dto';
import { format } from 'date-fns';

@Injectable()
export class SpacesService {
  constructor(private prismaService: PrismaService) { }


  mapSaveOperationHoursDtoToOperationHours(saveOperationHoursDto: SaveOperationHoursDto[], spaceId: number) {
    const result = {
      spaceId: spaceId,
      mondayStart: null,
      mondayEnd: null,
      tuesdayStart: null,
      tuesdayEnd: null,
      wednesdayStart: null,
      wednesdayEnd: null,
      thursdayStart: null,
      thursdayEnd: null,
      fridayStart: null,
      fridayEnd: null,
      saturdayStart: null,
      saturdayEnd: null,
      sundayStart: null,
      sundayEnd: null,
      publicHolidayStart: null,
      publicHolidayEnd: null,
    }
    saveOperationHoursDto.forEach((operationHour) => {
      switch (operationHour.codeName) {
        case 'monday':
          result.mondayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.mondayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'tuesday':
          result.tuesdayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.tuesdayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'wednesday':
          result.wednesdayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.wednesdayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'thursday':
          result.thursdayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.thursdayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'friday':
          result.fridayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.fridayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'saturday':
          result.saturdayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.saturdayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'sunday':
          result.sundayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.sundayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
        case 'publicHoliday':
          result.publicHolidayStart = operationHour.isEnable ? format(new Date(operationHour.startTime), 'HH:mm') : null;
          result.publicHolidayEnd = operationHour.isEnable ? format(new Date(operationHour.endTime), 'HH:mm') : null;
          break;
      }
    });
    return result;
  }


  mapSaveSpaceDtoToSpace(saveSpaceDto: SaveSpaceDto) {
    return {
      propId: Number(saveSpaceDto.propId),
      name: saveSpaceDto.name,
      floor: Number(saveSpaceDto.floor),
      fromFloor: Number(saveSpaceDto.fromFloor),
      toFloor: Number(saveSpaceDto.toFloor),
      spaceUsageType: saveSpaceDto.spaceUsageType,
      area: Number(saveSpaceDto.area),
      //operationHours: this.mapSaveOperationHoursDtoToOperationHours(saveSpaceDto.operationHours, saveSpaceDto.id),
    };
  }


  async save(saveSpaceDto: SaveSpaceDto) {
    const space = this.mapSaveSpaceDtoToSpace(saveSpaceDto);
    //console.log('saveSpaceDto.operationHours', space);
    const spacesResult = await this.prismaService.space.upsert({
      where: { id: Number(saveSpaceDto.id) },
      update: space,
      create: space,
    });

    

    // if(saveSpaceDto.id == null) {
    //   await this.prismaService.operatingHours.createMany({
    //     data: this.mapSaveOperationHoursDtoToOperationHours(saveSpaceDto.operationHours, spacesResult.id),
    //   });
    // } else {
    //   await this.prismaService.operatingHours.updateMany({
    //     where: { spaceId: spacesResult.id },
    //     data: this.mapSaveOperationHoursDtoToOperationHours(saveSpaceDto.operationHours, spacesResult.id),
    //   });
    // }

    const operationHours = this.mapSaveOperationHoursDtoToOperationHours(saveSpaceDto.operationHours, spacesResult.id);
    console.log('saveSpaceDto.operationHours', operationHours);

    await this.prismaService.operatingHours.upsert({
      where: { spaceId: spacesResult.id },
      update: operationHours,
      create: operationHours,
    });
    
    //console.log('saveSpaceDto.id', saveSpaceDto.id);

    //   saveSpaceDto.id ?? spacesResult.id);



    // const createOperationHours =
    //   this.mapSaveOperationHoursDtoToOperationHours(saveSpaceDto.operationHours.filter((operationHour) => !operationHour.id),
    //     saveSpaceDto.id ?? spacesResult.id);
    // const updateOperationHours =
    //   this.mapSaveOperationHoursDtoToOperationHours(saveSpaceDto.operationHours.filter(
    //     (operationHour) => !!operationHour.id),
    //     saveSpaceDto.id ?? spacesResult.id);

    // console.log('createOperationHours', createOperationHours);
    // console.log('updateOperationHours', updateOperationHours);

    // await this.prismaService.operatingHours.createMany({
    //   data: createOperationHours,
    // });

    // await this.prismaService.operatingHours.updateMany({
    //   data: updateOperationHours,
    //   where: {
    //     id: {
    //       in: updateOperationHours.map((operationHour) => operationHour.id),
    //     },
    //   },
    // });

    return spacesResult;
  }

  remove(id: number) {
    console.log('id', id);
    return this.prismaService.space.delete({
      where: { id },
    });
  }
}
