import { Controller, Post, Body } from '@nestjs/common';
import { HeatingSystemService } from './heating-system.service';
import { SaveHeatingSystemDto } from './dto/save-heating-system.dto';

@Controller('heating-system')
export class HeatingSystemController {
  constructor(private readonly heatingSystemService: HeatingSystemService) {}

  @Post()
  create(@Body() saveHeatingSystemDto: SaveHeatingSystemDto) {
    return this.heatingSystemService.save(saveHeatingSystemDto);
  }
}
