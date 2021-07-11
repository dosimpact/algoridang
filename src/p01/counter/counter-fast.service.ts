import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from './entities/counter.entity';

@Injectable()
export class CounterFastService {
  constructor(
    @InjectRepository(Counter)
    private readonly counterRepo: Repository<Counter>,
  ) {
    const test = async () => {
      //eg) select * from counter
      let res: any = await counterRepo.createQueryBuilder().getMany();
      console.log(res);
      /*
      [Counter { id: 13, cnt: -6, name: 'main' },
      Counter { id: 14, cnt: -1, name: 'sub01' }
      ]*/

      //eg) select * from counter where name = 'main'
      res = await counterRepo
        .createQueryBuilder()
        .where('name = :name', { name: 'main' })
        .getOne();
      console.log(res);
      /*
      Counter { id: 13, cnt: -6, name: 'main' }
      */

      //eg) insert into counter(cnt,name) values(0,'sub01')
      res = await counterRepo
        .createQueryBuilder()
        .insert()
        .into(Counter)
        .values([
          {
            name: 'sub02',
            cnt: 1,
          },
        ])
        .execute();
      console.log(res);
      /*
      InsertResult {
      identifiers: [ { id: 15 } ],
      generatedMaps: [ { id: 15, cnt: 1 } ],
      raw: [ { id: 15, cnt: 1 } ]
      }
        */

      // eg) update counter set cnt='0' where name='sub01'
      res = await counterRepo
        .createQueryBuilder()
        .update(Counter)
        .set({
          cnt: -1,
        })
        .where('name = :name', { name: 'sub01' })
        .execute();
      console.log(res);
      /*
      UpdateResult { generatedMaps: [], raw: [], affected: 1 }
      */
    };
    // test();
  }

  async createCounter(name: string) {
    try {
      const result = await this.counterRepo
        .createQueryBuilder()
        .insert()
        .into(Counter)
        .values([
          {
            name,
          },
        ])
        .execute();

      const counter: Counter = result.raw[0];
      if (!counter) throw new Error('cannot create counter');

      return {
        name,
        cnt: 0,
      };
    } catch (error) {
      console.log('cannot create counter');
    }
  }
  async getCount(name: string) {
    try {
      const counter = await this.counterRepo
        .createQueryBuilder()
        .where('name = :name', { name })
        .getOne();
      // const counter = await this.counterRepo.findOneOrFail({ name });
      return counter.cnt;
    } catch (error) {}
  }
  async upCount(name: string) {
    try {
      const cnt = await this.getCount(name);

      const updateResult = await this.counterRepo
        .createQueryBuilder()
        .update(Counter)
        .set({ cnt: cnt + 1 })
        .execute();
      if (updateResult.affected === 0) throw new Error('cannot up Count');
      return cnt + 1;
    } catch (error) {}
  }
  async downCount(name: string) {
    try {
      const cnt = await this.getCount(name);
      const updateResult = await this.counterRepo
        .createQueryBuilder()
        .update(Counter)
        .set({ cnt: cnt - 1 })
        .execute();
      if (updateResult.affected === 0) throw new Error('cannot up Count');
      return cnt - 1;
    } catch (error) {}
  }
}
