import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { HeatingConsumptionsService } from './heating-consumptions.service';
import { SaveHeatingConsumptionDto } from './dto/save-heating-consumption.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('heating-consumptions')
export class HeatingConsumptionsController {
  constructor(private readonly heatingConsumptionsService: HeatingConsumptionsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  save(@Body() saveHeatingConsumptionDto: SaveHeatingConsumptionDto[]) {
    return this.heatingConsumptionsService.save(saveHeatingConsumptionDto);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll() {
    return this.heatingConsumptionsService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  findOne(@Param('id') id: string) {
    return this.heatingConsumptionsService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  remove(@Param('id') id: string) {
    return this.heatingConsumptionsService.remove(+id);
  }
}
