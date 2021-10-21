import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Corporation } from './corporation.entity';
// 37 - 3 - 1 = 33 / 33
@Entity({ name: 'financial_statement' })
export class FinancialStatement {
  @IsDateString()
  @PrimaryColumn({ type: 'timestamptz' })
  finance_date: string;

  // relation field
  @IsString()
  @PrimaryColumn({ length: 10 })
  ticker: string;

  @ManyToOne(() => Corporation, (corporation) => corporation.categoryList)
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;

  // ---- 4
  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  market_cap?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  revenue?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  operating_income?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  EPS?: number; // EPS 원
  // ---- 5
  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  PER?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  EV_per_EBITDA?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  ROE?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dividend_yield?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  BETA?: number;
  // ----
  // 분기 데이터 접미사 Q
  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  revenue_Q?: number; // 매출액(분기)

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  operating_income_Q?: number; //영업이익(분기)

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  net_income_Q?: number; // 당기순이익

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  controlling_interest_Q?: number; // 지배주주순이익

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  non_controlling_interest_Q?: number; //비지배주주순이익

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  total_assets_Q?: number; // 자산총계

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  total_stock_holders_Q?: number; // 자본총계

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  controlling_interest_share_Q?: number; // 지배주주지분

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  non_controlling_interest_share_Q?: number; //비지배주주지분

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  capital_Q?: number; // 자본금
  // 분기 데이터 접미사 Q 6개

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  debt_ratio_Q?: number; // 부채비율

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  retention_rate_Q?: number; // 유보율

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  operating_margin_Q?: number; // 영업이익률

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  controlling_interest_rate_Q?: number; // 지배주주순이익률

  // --- 6
  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  ROA_Q?: number; // 분기 ROA

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  ROE_Q?: number; // 분기 ROE

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  EPS_Q?: number; // 분기 EPS

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  BPS_Q?: number; // 분기 BPS

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  DPS_Q?: number; // 분기 DPS

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  PBR_Q?: number; // 분기 PBR

  // --- 2
  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  outstanding_shares_Q?: number; // 지배주주순이익률

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dividend_yield__Q?: number; // 배당수익률
  // --- end entity property
}

type RequestFSKeys = Omit<
  FinancialStatement,
  'finance_date' | 'ticker' | 'corporation'
>;

type RequestFSBody =
  | {
      operator: 'between';
      values: [number, number]; // number[]와 달리 튜플을 다음처럼 정의한다.
    }
  | {
      operator: 'up';
      values: [number];
    }
  | {
      operator: 'down';
      values: [number];
    }
  | number;

export type RequestFSData = Partial<Record<keyof RequestFSKeys, RequestFSBody>>;

export type RequestFS = {
  strategy: number;
  numberOfData: number;
  data: RequestFSData;
};
