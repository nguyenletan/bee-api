import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bee Api! The url is localhost:8282/api';
  }
}
