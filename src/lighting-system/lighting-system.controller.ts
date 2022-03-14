import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LightingSystemService } from './lighting-system.service';
import { CreateLightingSystemDto } from './dto/create-lighting-system.dto';
import { UpdateLightingSystemDto } from './dto/update-lighting-system.dto';

@Controller('lighting-system')
export class LightingSystemController {
  constructor(private readonly lightingSystemService: LightingSystemService) {}

  @Post()
  create(@Body() createLightingSystemDto: CreateLightingSystemDto) {
    return this.lightingSystemService.create(createLightingSystemDto);
  }

  @Get()
  findAll() {
    return this.lightingSystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightingSystemService.findOne(+id);
  }

  @Get('/findByBuildingId/:buildingId')
  findByBuildingId(@Param('buildingId') buildingId: string) {
    return this.lightingSystemService.findByBuildingId(+buildingId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLightingSystemDto: UpdateLightingSystemDto) {
    return this.lightingSystemService.update(+id, updateLightingSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightingSystemService.remove(+id);
  }
}
