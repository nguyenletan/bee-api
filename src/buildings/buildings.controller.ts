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

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createBuildingDto: BuildingDto, @Req() req: any) {
    console.log('Create building');
    console.log(req.user);
    //console.log(createBuildingDto.generalBuildingInformation);

    return this.buildingsService.create(createBuildingDto, req.user);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(@Req() req: any) {
    console.log(req.user);
    return this.buildingsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(+id);
  }

  @Get('edit/:id')
  findOneForEditing(@Param('id') id: string) {
    return this.buildingsService.findOneForEditing(+id);
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
