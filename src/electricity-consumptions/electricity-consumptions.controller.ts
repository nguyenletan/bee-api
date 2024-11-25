import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ElectricityConsumptionsService } from './electricity-consumptions.service';
import { SaveElectricityConsumptionDto } from './dto/save-electricity-consumption.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('electricity-consumptions')
export class ElectricityConsumptionsController {
  constructor(private readonly electricityConsumptionsService: ElectricityConsumptionsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  save(@Body() saveElectricityConsumptionDto: SaveElectricityConsumptionDto[], @Req() req: any) {
    console.log('saveElectricityConsumptionDto: ', saveElectricityConsumptionDto);
    return this.electricityConsumptionsService.save(saveElectricityConsumptionDto, req.user);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.electricityConsumptionsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electricityConsumptionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electricityConsumptionsService.remove(+id);
  }
}
