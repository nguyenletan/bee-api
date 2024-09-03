import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressMockDataService } from './progress-mock-data.service';
import { CreateProgressMockDatumDto } from './dto/create-progress-mock-datum.dto';
import { UpdateProgressMockDatumDto } from './dto/update-progress-mock-datum.dto';

@Controller('progress-mock-data')
export class ProgressMockDataController {
  constructor(private readonly progressMockDataService: ProgressMockDataService) {}

  @Post()
  create(@Body() createProgressMockDatumDto: CreateProgressMockDatumDto) {
    return this.progressMockDataService.create(createProgressMockDatumDto);
  }

  @Get()
  findAll() {
    return this.progressMockDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressMockDataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressMockDatumDto: UpdateProgressMockDatumDto) {
    return this.progressMockDataService.update(+id, updateProgressMockDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressMockDataService.remove(+id);
  }
}
