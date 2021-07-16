import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
@Injectable()
export class HelperService {
  SALT_ROUNDS = 10;
}
