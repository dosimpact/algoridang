export interface CreateInvestProfitInfoInput {
  invest_principal?: string; // 투자 원금
  securities_corp_fee?: string; // 수수료
  invest_start_date: string;
  invest_end_date?: string;
}
