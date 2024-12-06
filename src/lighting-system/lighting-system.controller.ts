import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LightingSystemService } from './lighting-system.service';
import { SaveLightingSystemDto } from './dto/save-lighting-system.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('lighting-system')
export class LightingSystemController {
  constructor(private readonly lightingSystemService: LightingSystemService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() saveLightingSystemDto: SaveLightingSystemDto[]) {
    return this.lightingSystemService.save(saveLightingSystemDto);
  }
}
