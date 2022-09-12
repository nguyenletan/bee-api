import { Injectable } from '@nestjs/common';
import { CreateProgressMockDatumDto } from './dto/create-progress-mock-datum.dto';
import { UpdateProgressMockDatumDto } from './dto/update-progress-mock-datum.dto';

@Injectable()
export class ProgressMockDataService {
  create(createProgressMockDatumDto: CreateProgressMockDatumDto) {
    return 'This action adds a new progressMockDatum';
  }

  findAll() {
    return `This action returns all progressMockData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progressMockDatum`;
  }

  update(id: number, updateProgressMockDatumDto: UpdateProgressMockDatumDto) {
    return `This action updates a #${id} progressMockDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressMockDatum`;
  }
}
