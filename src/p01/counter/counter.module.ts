import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterResolver } from './counter.resolver';
import { CounterService } from './counter.service';
import { Counter } from './entities/counter.entity';
import { CounterFastService } from './counter-fast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  controllers: [],
  exports: [],
  providers: [CounterResolver, CounterService, CounterFastService],
})
export class CounterModule {}
