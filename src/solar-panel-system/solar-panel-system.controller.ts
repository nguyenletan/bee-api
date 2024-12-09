import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SolarPanelSystemService } from './solar-panel-system.service';
import { SaveSolarPanelSystemDto } from './dto/save-solar-panel-system.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('solar-panel-system')
export class SolarPanelSystemController {
  constructor(private readonly solarPanelSystemService: SolarPanelSystemService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  save(@Body() saveSolarPanelSystemDtos: SaveSolarPanelSystemDto[]) {
    return this.solarPanelSystemService.save(saveSolarPanelSystemDtos);
  }
}
