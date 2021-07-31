// import { IsEnum, IsNumber, IsString } from 'class-validator';
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { SettingJSON, StrategyName } from '../constant/strategy-setting';
// // import { StockList } from './stock-list.entity';

// // deprecated Entity
// @Entity({ name: 'custom_trading_strategy' })
// export class CustomTradingStrategy {
//   @IsNumber()
//   @PrimaryGeneratedColumn()
//   trading_strategy_code: number;

//   @IsEnum(StrategyName)
//   @Column({
//     type: 'enum',
//     enum: StrategyName,
//     default: StrategyName.GoldenCross,
//   })
//   trading_strategy_name: StrategyName;

//   @IsString()
//   @Column({ type: 'json' })
//   setting_json: SettingJSON;

//   // 1:N
//   // (1) (deprecated) 커스텀 트레이딩 셋팅이 적용된 사용자전략
//   // @Column()
//   // stragety_code: number;

//   // @OneToMany(() => MemberStrategy, (ms) => ms.customTradingStrategy)
//   // @JoinColumn({ name: 'stragety_code' })
//   // stragety: MemberStrategy;

//   //(2) 해당 전략을 사용하는 종목들 (mapping table)
//   // @OneToMany(() => StockList, (sl) => sl.trading_strategy)
//   // stock_lists: StockList[];
// }
