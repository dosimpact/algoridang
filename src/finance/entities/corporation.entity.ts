import { IsString } from 'class-validator';
import { StockList } from 'src/strategy/entities';
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

  // 1:N
  // (1) 회사의 일봉 데이터 리스트
  @OneToMany(() => DailyStock, (dailyStock) => dailyStock.corporation)
  dailyStocks: DailyStock[];

  // N:M
  // (1) 회사의 소속 카테고리 리스트
  @OneToMany(() => CategoryList, (categoryList) => categoryList.corporation)
  categoryList: CategoryList[];

  // (2) 이 회사를 참조하는 전략들
  @OneToMany(() => StockList, (sl) => sl.corporation)
  stragetyList: StockList[];
}
