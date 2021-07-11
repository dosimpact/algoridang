import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from './entities/counter.entity';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter)
    private readonly counterRepo: Repository<Counter>,
  ) {}

  async createCounter(name: string) {
    try {
      const counter = await this.counterRepo.save(
        this.counterRepo.create({ name }),
      );
      return {
        name: counter.name,
        cnt: counter.cnt,
      };
    } catch (error) {
      console.log('cannot create counter');
    }
  }
  async getCount(name: string) {
    try {
      const counter = await this.counterRepo.findOneOrFail({ name });
      return counter.cnt;
    } catch (error) {}
  }
  async upCount(name: string) {
    try {
      const counter = await this.counterRepo.findOneOrFail({ name });
      counter.cnt += 1;
      this.counterRepo.save(counter);
      return counter.cnt;
    } catch (error) {}
  }
  async downCount(name: string) {
    try {
      const counter = await this.counterRepo.findOneOrFail({ name });
      counter.cnt -= 1;
      this.counterRepo.save(counter);
      return counter.cnt;
    } catch (error) {}
  }
}
