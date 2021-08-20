import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { History } from '../entities';

export class CreateInvestProfitInfoInput {
  @IsString()
  @IsOptional()
  invest_principal?: string; // 투자 원금

  @IsString()
  @IsOptional()
  securities_corp_fee?: string;

  @IsDateString()
  invest_start_date: string;

  @IsDateString()
  @IsOptional()
  invest_end_date?: string;
}

export class AddHistoryInput extends PickType(History, [
  'history_date',
  'buy_sale_price',
  'profit_loss_rate',
  'strategy_code',
  'ticker',
]) {}
export class AddHistoryOutput extends CoreOutput {
  history?: History;
}
export class DeleteHistoryInput {
  @IsInt({ each: true })
  history_code: number | number[];
}
export class DeleteHistoryOutput extends CoreOutput {
  affected: number;
}

export class UpdateHistoryInput extends PartialType(AddHistoryInput) {
  @IsNumber()
  history_code: number;
}
export class UpdateHistoryOutput extends CoreOutput {
  history?: History;
}

export class SetBackTestOutput extends CoreOutput {
  task_id?: string;
}

export class PushBackTestQInput {
  @IsString()
  strategy_code: string;
}
export class PushBackTestQOutput extends CoreOutput {
  task_id?: string;
}
