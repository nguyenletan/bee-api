import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LightingSystemImprovementService } from './lighting-system-improvement.service';
import { LightingSystemImprovementDto } from './dto/lighting-system-improvement.dto';

@Controller('lighting-system-improvement')
export class LightingSystemImprovementController {
  constructor(
    private readonly lightingSystemImprovementService: LightingSystemImprovementService,
  ) {}

  @Post()
  createOrUpdate(
    @Body()
    lightingSystemImprovementDto: LightingSystemImprovementDto[],
  ) {
    return this.lightingSystemImprovementService.createOrUpdate(
      lightingSystemImprovementDto,
    );
  }

  @Get()
  findAll() {
    return this.lightingSystemImprovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightingSystemImprovementService.findOne(+id);
  }

  @Patch()
  update(
    @Body()
    lightingSystemImprovementDto: LightingSystemImprovementDto[],
  ) {
    console.log(
      'updateLightingSystemImprovementDto: ',
      lightingSystemImprovementDto,
    );
    return this.lightingSystemImprovementService.update(
      lightingSystemImprovementDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightingSystemImprovementService.remove(+id);
  }
}
