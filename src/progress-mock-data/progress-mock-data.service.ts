import { Injectable } from '@nestjs/common';
import { CreateProgressMockDatumDto } from './dto/create-progress-mock-datum.dto';
import { UpdateProgressMockDatumDto } from './dto/update-progress-mock-datum.dto';

var student01 = require('./mock-data/student01.json');
var student02 = require('./mock-data/student02.json');
@Injectable()
export class ProgressMockDataService {
  create(createProgressMockDatumDto: CreateProgressMockDatumDto) {
    return 'This action adds a new progressMockDatum';
  }

  findAll() {
    return `This action returns all progressMockData`;
  }

  findOne(id: string) {
    switch (id) {
      case '1':
        return student01;
      case '2':
        return student02;
      default:
        return student01;
    }
    //return `This action returns a #${id} progressMockDatum`;
  }

  update(id: number, updateProgressMockDatumDto: UpdateProgressMockDatumDto) {
    return `This action updates a #${id} progressMockDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressMockDatum`;
  }
}
