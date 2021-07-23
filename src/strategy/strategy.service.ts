import { Injectable } from '@nestjs/common';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Injectable()
export class StrategyService {
  create(createStrategyDto: CreateStrategyDto) {
    return 'This action adds a new strategy';
  }

  findAll() {
    return `This action returns all strategy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} strategy`;
  }

  update(id: number, updateStrategyDto: UpdateStrategyDto) {
    return `This action updates a #${id} strategy`;
  }

  remove(id: number) {
    return `This action removes a #${id} strategy`;
  }
}
