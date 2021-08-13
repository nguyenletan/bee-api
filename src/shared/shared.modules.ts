import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PVGISService } from './externalAPIs/PVGIS.service';

@Module({
  imports: [HttpModule],
  exports: [PVGISService],
  providers: [PVGISService],
})
export class SharedModule {}
