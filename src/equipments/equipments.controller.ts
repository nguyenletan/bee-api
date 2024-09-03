import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll() {
    return this.equipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @Get('getProjectPeakDemand/:id/:numberOfNextDays')
  getProjectPeakDemand(@Param('id') id: string, @Param('numberOfNextDays') numberOfNextDays: string) {
    return this.equipmentsService.getProjectPeakDemand(+id, +numberOfNextDays);
  }

  @Get('getEnergyConsumption/:id/:startDate/:endDate')
  getEnergyConsumption(@Param('id') id: string, @Param('startDate') startDate: string, @Param('endDate') endDate: string) {
    return this.equipmentsService.getEnergyConsumption(+id, new Date(startDate + 'T23:00:00'), new Date(endDate + 'T23:00:00'));
  }

  @Get('getEnergyConsumptionByIdAndGroupByYear/:id')
  getEnergyConsumptionByIdAndGroupByYear(@Param('id') id: string) {
    return this.equipmentsService.getEnergyConsumptionByIdAndGroupByYear(+id);
  }

  @Get('getEnergyConsumptionPercentage/:equipmentId/:equipmentTypeId/:subSystemId/:buildingId/:startDate/:endDate')
  getEnergyConsumptionPercentage(
    @Param('equipmentId') equipmentId: string,
    @Param('equipmentTypeId') equipmentTypeId: string,
    @Param('subSystemId') subSystemId: string,
    @Param('buildingId') buildingId: string,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string
  ) {
    return this.equipmentsService.getEnergyConsumptionPercentage(
      +equipmentId,
      +equipmentTypeId,
      +subSystemId,
      +buildingId,
      new Date(startDate + 'T23:00:00'),
      new Date(endDate + 'T23:00:00')
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentsService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(+id);
  }
}
