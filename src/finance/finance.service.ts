import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Like, Repository } from 'typeorm';

@Injectable()
export class FinanceService {
  constructor() {}
}
