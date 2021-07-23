import { IsNumber, IsString } from 'class-validator';
import { Corporation } from 'src/finance/entities';
import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { MemberStrategy } from './member-strategy.entity';

// 전략이 가지고 있는 티커들 매핑 테이블
@Entity({ name: 'stock_list' })
export class StockList {
  @IsNumber()
  @PrimaryColumn()
  strategy_code: number;

  @OneToMany(() => MemberStrategy, (str) => str.stockList)
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsString()
  @PrimaryColumn({ length: 10 })
  ticker: string;

  @OneToMany(() => Corporation, (corp) => corp.stragetyList)
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;
}
