import { Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CounterFastService as CounterService } from './counter-fast.service';

@Resolver()
export class CounterResolver {
  // private cnt: number = 0;
  private readonly name = 'subtest';
  constructor(private readonly counterService: CounterService) {}

  @Query((returns) => Int)
  CounteNow() {
    return this.counterService.getCount(this.name);
  }
  @Mutation((returns) => Int)
  countUP() {
    return this.counterService.upCount(this.name);
  }
  @Mutation((returns) => Int)
  countDown() {
    return this.counterService.downCount(this.name);
  }
  @Mutation((returns) => Boolean)
  createCount() {
    try {
      this.counterService.createCounter(this.name);
      return true;
    } catch (error) {
      return false;
    }
  }
}
