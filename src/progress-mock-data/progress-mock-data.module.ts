import { Module } from '@nestjs/common';
import { ProgressMockDataService } from './progress-mock-data.service';
import { ProgressMockDataController } from './progress-mock-data.controller';

@Module({
  controllers: [ProgressMockDataController],
  providers: [ProgressMockDataService],
})
export class ProgressMockDataModule {}
