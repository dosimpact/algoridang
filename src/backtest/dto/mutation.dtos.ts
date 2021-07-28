import { IsDateString, IsNumber, IsOptional } from 'class-validator';

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
