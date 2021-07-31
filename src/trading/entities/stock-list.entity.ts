// import { IsNumber, IsOptional, IsString } from 'class-validator';
// import { Corporation } from 'src/finance/entities';
// import { CustomTradingStrategy } from 'src/trading/entities';
// import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
// import { MemberStrategy } from '../../strategy/entities/member-strategy.entity';

// deprecated Entity
// // 전략이 가지고 있는 티커들 매핑 테이블
// // (1) 어떤 전략 (2) 어떤 종목에 (3) 어떤 매매전략을 적용
// @Entity({ name: 'stock_list' })
// export class StockList {
//   //(1) 어떤 전략
//   @IsNumber()
//   @PrimaryColumn()
//   strategy_code: number;

//   @OneToMany(() => MemberStrategy, (str) => str.stockList)
//   @JoinColumn({ name: 'strategy_code' })
//   strategy: MemberStrategy;

//   //(2) 어떤 종목에
//   @IsString()
//   @PrimaryColumn({ length: 10 })
//   ticker: string;

//   @OneToMany(() => Corporation, (corp) => corp.stragetyList)
//   @JoinColumn({ name: 'ticker' })
//   corporation: Corporation;

//   //(3) 어떤 매매전략을 적용
//   @IsString()
//   @IsOptional()
//   @Column({ nullable: true })
//   trading_strategy_code?: number;

//   @OneToMany(() => CustomTradingStrategy, (cts) => cts.stock_lists)
//   @JoinColumn({ name: 'trading_strategy_code' })
//   trading_strategy: CustomTradingStrategy;
// }
