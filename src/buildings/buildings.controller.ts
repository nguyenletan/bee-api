import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingDto } from './dto/building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import {
  format,
  lastDayOfMonth,
  lastDayOfQuarter,
  startOfQuarter,
} from 'date-fns';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createBuildingDto: BuildingDto, @Req() req: any) {
    // console.log('Create building');
    // console.log(req.user);
    //console.log(createBuildingDto.generalBuildingInformation);

    return this.buildingsService.create(createBuildingDto, req.user);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(@Req() req: any) {
    // console.log(req.user);
    return this.buildingsService.findAll(req.user);
  }

  @Get(':id/:startday/:endday')
  @UseGuards(FirebaseAuthGuard)
  findOne(
    @Param('id') id: string,
    @Param('startday') startDay: string,
    @Param('endday') endDay: string,
  ) {
    // console.log(startDay);
    // console.log(endDay);

    return this.buildingsService.findOne(+id, startDay, endDay);
  }

  @Get('edit/:id')
  findOneForEditing(@Param('id') id: string) {
    return this.buildingsService.findOneForEditing(+id);
  }

  @Get('get-breakdown/:id/:type/:firstDayParam/:secondDayParam/:thirdDayParam')
  calculateBreakdownByTime(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('firstDayParam') firstDayParam: string,
    @Param('secondDayParam') secondDayParam: string,
    @Param('thirdDayParam') thirdDayParam: string,
  ) {
    let startDay: Date;
    let endDay: Date;

    switch (type) {
      case 'day':
        startDay = endDay = new Date(
          firstDayParam + '-' + secondDayParam + '-' + thirdDayParam,
        );
        break;
      // case 'week':
      //   startDay = endDay = new Date(
      //     firstDayParam + '-' + secondDayParam + '-' + thirdDayParam,
      //   );
      //   break;
      case 'quarter':
        const month = +secondDayParam * 3;
        startDay = startOfQuarter(
          new Date(firstDayParam + '-' + month + '-' + '01'),
        );
        endDay = lastDayOfQuarter(
          new Date(firstDayParam + '-' + month + '-' + '01'),
        );
        break;
      case 'year':
        startDay = new Date(firstDayParam + '-' + '01' + '-' + '01');
        endDay = new Date(firstDayParam + '-' + '12' + '-' + '31');
        break;
      case 'month':
      default:
        startDay = new Date(firstDayParam + '-' + secondDayParam + '-' + '01');
        endDay = lastDayOfMonth(
          new Date(firstDayParam + '-' + secondDayParam + '-' + '01'),
        );
        break;
    }

    return this.buildingsService.calculateBreakdownByTime(
      +id,
      format(startDay, 'yyyy-MM-dd'),
      format(endDay, 'yyyy-MM-dd'),
    );
  }

  @Post('edit/:id')
  update(@Param('id') id: string, @Body() updateBuildingDto: BuildingDto) {
    return this.buildingsService.update(+id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(+id);
  }
}
