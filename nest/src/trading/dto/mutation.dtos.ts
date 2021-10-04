import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { SettingJSON, StrategyName } from '../constant/strategy-setting';
import { Universal } from '../entities';
// import { StockList } from '../entities/stock-list.entity';

export class AddUniversalOnlyInput extends PickType(Universal, [
  'strategy_code',
  'ticker',
]) {}
export class AddUniversalOnlyOutput extends CoreOutput {
  universal?: Universal;
}

// server only
export class UpsertTradingStrategyInput {
  @IsString()
  strategy_code: string;
  @IsNumber()
  universal_code: number;

  @IsEnum(StrategyName)
  trading_strategy_name: StrategyName;

  // https://github.com/typestack/class-validator/issues/126
  // interface는 컴파일되므로 검사할 수 없다.
  @IsObject()
  setting_json: SettingJSON;
}
export class UpsertTradingStrategyOutput extends CoreOutput {
  universal?: Universal;
}

//
export class AddUniversalInput extends AddUniversalOnlyInput {
  @IsString()
  strategy_code: string;

  @IsEnum(StrategyName)
  trading_strategy_name: StrategyName;

  // https://github.com/typestack/class-validator/issues/126
  // interface는 컴파일되므로 검사할 수 없다.
  @IsObject()
  setting_json: SettingJSON;
}

export class AddUniversalOutput extends CoreOutput {
  universal?: Universal;
}
