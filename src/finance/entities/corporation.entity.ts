import { IsOptional, IsString } from 'class-validator';
import { Universal } from 'src/trading/entities';
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

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', length: 15, nullable: true })
  market?: string;

  // 1:N
  // (1) 회사의 일봉 데이터 리스트
  @OneToMany(() => DailyStock, (dailyStock) => dailyStock.corporation)
  dailyStocks: DailyStock[];

  // (2) 이 회사를 유니버셜로 쓰는 전략 매핑 테이블
  @OneToMany(() => Universal, (univ) => univ.corporation)
  universal: Universal[];

  // N:M
  // (1) 회사의 소속 카테고리 리스트
  @OneToMany(() => CategoryList, (categoryList) => categoryList.corporation)
  categoryList: CategoryList[];

  // (2) 이 회사를 참조하는 전략들
  // @OneToMany(() => StockList, (sl) => sl.corporation)
  // stragetyList: StockList[];

  // (3) 이 회사를 히스토리로 가지는 전략들 리스트 (참조 안함)
}
