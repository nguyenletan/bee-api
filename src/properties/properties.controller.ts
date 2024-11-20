import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './entities/property.entity';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createProperty: Property) {
    return this.propertiesService.create(createProperty);
  }

  @Post('/create-partial')
  @UseGuards(FirebaseAuthGuard)
  createPartial(@Body() createProperty: Property, @Req() req: any) {
    return this.propertiesService.createPartial(createProperty, req.user);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  update(@Param('id') id: string, @Body() updateProperty: Property, @Req() req: any) {
    return this.propertiesService.update(+id, updateProperty, req.user);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(@Req() req: any) {
    return this.propertiesService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
