import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { SettingJSON, StrategyName } from '../constant/strategy-setting';
import { Universal } from '../entities';
// import { StockList } from '../entities/stock-list.entity';

export class CopyBaseTradingStrategyInput {
  @IsNumber()
  trading_strategy_code: number;

  //   @ValidateNested()
  //   @Type()
  @IsJSON()
  setting_json: SettingJSON;
}
// todo refactor
export class CopyBaseTradingStrategyOutput extends CoreOutput {
  // customTradingStrategy?: CustomTradingStrategy;
}

export class AddUniversalInput extends PickType(Universal, [
  'strategy_code',
  'ticker',
  'start_date',
  'end_date',
  'select_yes_no',
]) {}
export class AddUniversalOutput extends CoreOutput {
  universal?: Universal;
}

export class UpsertTradingStrategyInput {
  @IsNumber()
  strategy_code: number;
  @IsNumber()
  universal_code: number;

  @IsEnum(StrategyName)
  trading_strategy_name: StrategyName;
  //   @ValidateNested()
  //   @Type()
  @IsJSON()
  setting_json: SettingJSON;
}
export class UpsertTradingStrategyOutput extends CoreOutput {
  universal?: Universal;
}

export class UpsertTickerWithTradingStrategyInput extends IntersectionType(
  AddUniversalInput,
  UpsertTradingStrategyInput,
) {}
export class UpsertTickerWithTradingStrategyOutput extends CoreOutput {
  universal?: Universal;
}
