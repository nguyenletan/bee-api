import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CoolingSystemService } from './cooling-system.service';
import { SaveCoolingSystemDto } from './dto/save-cooling-system.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('cooling-system')
export class CoolingSystemController {
  constructor(private readonly coolingSystemService: CoolingSystemService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() saveCoolingSystemDto: SaveCoolingSystemDto, @Req() req: any) {
    return this.coolingSystemService.save(saveCoolingSystemDto, req.user);
  }
}
