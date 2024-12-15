import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SaveSpaceDto } from './dto/save-space.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  save(@Body() saveSpaceDto: SaveSpaceDto) {
    return this.spacesService.save(saveSpaceDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  remove(@Param('id') id: string) {
    return this.spacesService.remove(+id);
  }

}
