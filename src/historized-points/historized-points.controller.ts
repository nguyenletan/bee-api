import { Controller, Get, Param, Delete } from '@nestjs/common';
import { HistorizedPointsService } from './historized-points.service';

@Controller('historized-points')
export class HistorizedPointsController {
  constructor(
    private readonly historizedPointsService: HistorizedPointsService,
  ) {}

  @Get()
  findAll() {
    return this.historizedPointsService.findAll();
  }

  @Get('sum_all_cooling_by_property_date_range/:id/:startDay/:endDay')
  sumAllCoolingHistorizedPointsByPropertyId1Year(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.sumAllCoolingHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get('sum_all_heating_by_property_date_range/:id/:startDay/:endDay')
  sumAllHeatingHistorizedPointsByPropertyId1Year(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.sumAllHeatingHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get('sum_all_lighting_by_property_date_range/:id/:startDay/:endDay')
  sumAllLightingHistorizedPointsByPropertyId1Year(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.sumAllLightingHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get('sum_all_overall_by_property_date_range/:id/:startDay/:endDay')
  sumAllOverallHistorizedPointsByPropertyId1Year(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.sumAllOverallHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_all_equipment_type_of_cooling_historized_points_by_property_id_and_date_range/:id/:startDay/:endDay',
  )
  getAllEquipmentTypeOfCoolingHistorizedPointsByPropertyIdAndDateRange(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getAllEquipmentTypeOfCoolingHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_all_equipment_type_of_heating_historized_points_by_property_id_and_date_range/:id/:startDay/:endDay',
  )
  getAllEquipmentTypeOfHeatingHistorizedPointsByPropertyIdAndDateRange(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getAllEquipmentTypeOfHeatingHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_all_equipment_type_of_mechanical_ventilation_historized_points_by_property_id_and_date_range/:id/:startDay/:endDay',
  )
  getAllEquipmentTypeOfMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getAllEquipmentTypeOfMechanicalVentilationHistorizedPointsByPropertyIdAndDateRange(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_overall_historized_points_by_property_id_and_group_by_year/:id/:startDay/:endDay',
  )
  getOverallHistorizedPointsByPropertyIdAndGroupByYear(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByYear(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_overall_historized_points_by_property_id_and_group_by_quarter/:id/:startDay/:endDay',
  )
  getOverallHistorizedPointsByPropertyIdAndGroupByQuarter(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByQuarter(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_overall_historized_points_by_property_id_and_group_by_month/:id/:startDay/:endDay',
  )
  getOverallHistorizedPointsByPropertyIdAndGroupByMonth(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByMonth(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_overall_historized_points_by_property_id_and_group_by_week/:id/:startDay/:endDay',
  )
  getOverallHistorizedPointsByPropertyIdAndGroupByWeek(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByWeek(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(
    'get_overall_historized_points_by_property_id_and_group_by_day/:id/:startDay/:endDay',
  )
  getOverallHistorizedPointsByPropertyIdAndGroupByDay(
    @Param('id') id: string,
    @Param('startDay') startDay: string,
    @Param('endDay') endDay: string,
  ) {
    return this.historizedPointsService.getOverallHistorizedPointsByPropertyIdAndGroupByDay(
      +id,
      new Date(startDay),
      new Date(endDay),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historizedPointsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historizedPointsService.remove(+id);
  }
}
