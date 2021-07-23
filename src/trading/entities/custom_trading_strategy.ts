import { IsEnum, IsNumber, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SettingJSON, StrategyName } from '../constant/strategy-setting';

@Entity({ name: 'custom_trading_strategy' })
export class CustomTradingStrategy {
  @IsNumber()
  @PrimaryGeneratedColumn()
  trading_strategy_code: number;

  @IsEnum(StrategyName)
  @Column({
    type: 'enum',
    enum: StrategyName,
    default: StrategyName.GoldenCross,
  })
  trading_strategy_name: StrategyName;

  @IsString()
  @Column({ type: 'json' })
  setting_json: SettingJSON;

  // 1:N
  // (1) 커스텀 트레이딩 셋팅이 적용된 사용자전략
  @Column()
  stragety_code: number;

  @OneToMany(() => MemberStrategy, (ms) => ms.customTradingStrategy)
  @JoinColumn({ name: 'stragety_code' })
  stragety: MemberStrategy;
}
