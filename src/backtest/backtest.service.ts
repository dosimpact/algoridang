import { Injectable } from '@nestjs/common';
import { CreateBacktestDto } from './dto/create-backtest.dto';
import { UpdateBacktestDto } from './dto/update-backtest.dto';

@Injectable()
export class BacktestService {
  create(createBacktestDto: CreateBacktestDto) {
    return 'This action adds a new backtest';
  }

  findAll() {
    return `This action returns all backtest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} backtest`;
  }

  update(id: number, updateBacktestDto: UpdateBacktestDto) {
    return `This action updates a #${id} backtest`;
  }

  remove(id: number) {
    return `This action removes a #${id} backtest`;
  }
}
