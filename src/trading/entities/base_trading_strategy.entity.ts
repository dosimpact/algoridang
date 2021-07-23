import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  SettingJSON,
  StrategyName,
  StrategyValue,
} from '../constant/strategy-setting';

// 매매전략 디폴트값 매핑 테이블
@Entity({ name: 'base_trading_strategy' })
export class BaseTradingStrategy {
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
}
