import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationHoursService } from './operation-hours.service';

@Controller('operation-hours')
export class OperationHoursController {
  constructor(private readonly operationHoursService: OperationHoursService) {}

}
