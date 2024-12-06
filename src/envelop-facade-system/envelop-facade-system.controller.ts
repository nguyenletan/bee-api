import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EnvelopFacadeSystemService } from './envelop-facade-system.service';
import { SaveEnvelopFacadeSystemDto } from './dto/save-envelop-facade-system.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('envelop-facade-system')
export class EnvelopFacadeSystemController {
  constructor(private readonly envelopFacadeSystemService: EnvelopFacadeSystemService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  save(@Body() saveEnvelopFacadeSystemDto: SaveEnvelopFacadeSystemDto) {
    return this.envelopFacadeSystemService.save(saveEnvelopFacadeSystemDto);
  }
}
