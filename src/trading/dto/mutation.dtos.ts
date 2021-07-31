import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { SettingJSON } from '../constant/strategy-setting';
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

export class AddTradingStrategyInput {
  @IsNumber()
  strategy_code: number;
  @IsString()
  ticker: string;

  @IsNumber()
  trading_strategy_code: number;

  //   @ValidateNested()
  //   @Type()
  @IsJSON()
  setting_json: SettingJSON;
}
export class AddTradingStrategyOutput extends CoreOutput {
  // stocksTable?: StockList;
}

export class UpsertTickerWithTradingStrategyInput {
  @IsNumber()
  strategy_code: number;
  @IsString()
  ticker: string;

  @IsNumber()
  trading_strategy_code: number;
  //   @ValidateNested()
  //   @Type()
  @IsJSON()
  setting_json: SettingJSON;
}
export class UpsertTickerWithTradingStrategyOutput extends CoreOutput {
  // stocksTable?: StockList;
}
