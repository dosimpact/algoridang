import { IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CategoryList } from './category-list.entity';
import { DailyStock } from './daily-stock.entity';

@Entity({ name: 'corporation' })
export class Corporation {
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 10 })
  ticker: string;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  corp_name: string;

  @OneToMany(() => DailyStock, (dailyStock) => dailyStock.corporation)
  dailyStocks: DailyStock[];

  @OneToMany(() => CategoryList, (categoryList) => categoryList.corporation)
  categoryList: CategoryList[];
}
