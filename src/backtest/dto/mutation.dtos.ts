import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { History } from '../entities';

export class CreateInvestProfitInfoInput {
  @IsNumber()
  @IsOptional()
  invest_principal?: number; // 투자 원금
  @IsNumber()
  @IsOptional()
  securities_corp_fee?: number;

  @IsDateString()
  invest_start_date: Date;

  @IsDateString()
  @IsOptional()
  invest_end_date?: Date;
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
