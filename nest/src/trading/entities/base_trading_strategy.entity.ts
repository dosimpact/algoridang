import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SettingJSON, StrategyName } from '../constant/strategy-setting';

// 매매전략 디폴트값 매핑 테이블
@Entity({ name: 'base_trading_strategy' })
export class BaseTradingStrategy {
  @PrimaryColumn({
    type: 'enum',
    enum: StrategyName,
  })
  @IsEnum(StrategyName)
  trading_strategy_name: StrategyName;

  @IsString()
  @Column({ type: 'json' })
  setting_json: SettingJSON;
}
