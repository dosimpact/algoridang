import { Universal } from 'states/trading/interface/entities';

// 기업과 카테고리의 N:M 매핑 테이블
export interface CategoryList {
  ticker: string;
  corporation: Corporation;
  category_code: number;
  category: Category;
  change_date: Date;
}

export interface Corporation {
  ticker: string;
  corp_name: string;
  // (1) 회사의 일봉 데이터 리스트
  dailyStocks: DailyStock[];
  // (2) 이 회사를 유니버셜로 쓰는 전략 매핑 테이블
  universal: Universal[];
  // (1) 회사의 소속 카테고리 리스트
  categoryList: CategoryList[];
}

export interface DailyStock {
  stock_date: string;
  open_price: number; //OHLCV
  high_price: number; //OHLCV
  low_price: number; //OHLCV
  close_price: number; //OHLCV
  volume: number; //OHLCV
  // 1:N관계
  // (1)
  ticker: string;
  corporation: Corporation;
}

export interface Category {
  category_code: number;
  category_name: string;
  change_date: Date;
  corporationList: CategoryList[];
}

export interface FinancialStatement {
  finance_date: string;
  ticker: string;
  corporation: Corporation;
  // ---- 4
  market_cap?: number;
  revenue?: number;
  operating_income?: number;
  EPS?: number; // EPS 원
  // ---- 5
  PER?: number;
  EV_per_EBITDA?: number;
  ROE?: number;
  dividend_yield?: number;
  BETA?: number;
  // 분기 데이터 접미사 Q
  revenue_Q?: number; // 매출액(분기)
  operating_income_Q?: number; //영업이익(분기)
  net_income_Q?: number; // 당기순이익
  controlling_interest_Q?: number; // 지배주주순이익
  non_controlling_interest_Q?: number; //비지배주주순이익
  total_assets_Q?: number; // 자산총계
  total_stock_holders_Q?: number; // 자본총계
  controlling_interest_share_Q?: number; // 지배주주지분
  non_controlling_interest_share_Q?: number; //비지배주주지분
  capital_Q?: number; // 자본금
  // 분기 데이터 접미사 Q 6개
  debt_ratio_Q?: number; // 부채비율
  retention_rate_Q?: number; // 유보율
  operating_margin_Q?: number; // 영업이익률
  controlling_interest_rate_Q?: number; // 지배주주순이익률

  // --- 6
  ROA_Q?: number; // 분기 ROA
  ROE_Q?: number; // 분기 ROE
  EPS_Q?: number; // 분기 EPS
  BPS_Q?: number; // 분기 BPS
  DPS_Q?: number; // 분기 DPS
  PBR_Q?: number; // 분기 PBR
  // --- 2
  outstanding_shares_Q?: number; // 지배주주순이익률
  dividend_yield__Q?: number; // 배당수익률
  // --- end entity property
}

export type RequestFSKeys = keyof Omit<
  FinancialStatement,
  'finance_date' | 'ticker' | 'corporation'
>;

export type RequestFSKeysLiterals = keyof RequestFSKeys;

export type RequestFSBody =
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

export type RequestFSData = Partial<Record<RequestFSKeys, RequestFSBody>>;

export type RequestFS = {
  strategy: number;
  numberOfData: number;
  data: RequestFSData;
};

export const RequestFSKeysToKo: Record<RequestFSKeys, string> = {
  market_cap: '시가총액',
  revenue: '매출액',
  operating_income: '영업이익',
  EPS: 'EPS(원)',
  PER: 'PER',
  EV_per_EBITDA: 'EV/EBITDA',
  ROE: 'ROE',
  dividend_yield: '배당수익률',
  BETA: '베타(1년)',
  revenue_Q: '매출액(분기)',
  operating_income_Q: '영업이익(분기)',
  net_income_Q: '당기순이익',
  controlling_interest_Q: '당기순이익(재배)',
  non_controlling_interest_Q: '당기순이익(비재배)',
  total_assets_Q: '자산총계',
  total_stock_holders_Q: '자본총계',
  controlling_interest_rate_Q: '자본총계(비지배)',
  non_controlling_interest_share_Q: '자본총계(비지배)',
  capital_Q: '자본금',
  debt_ratio_Q: '부채비율',
  retention_rate_Q: '자본유보율',
  operating_margin_Q: '영업이익률',
  controlling_interest_share_Q: '순이익률',
  ROA_Q: 'ROA',
  ROE_Q: 'ROE',
  EPS_Q: 'EPS(원)',
  BPS_Q: 'BPS(원)',
  DPS_Q: 'DPS(원)',
  PBR_Q: 'PBR',
  outstanding_shares_Q: '발행주식수(보통주)',
  dividend_yield__Q: '현금배당수익률',
};

export type IQuantPreset = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export const QuantPresetObject: Record<IQuantPreset, string> = {
  '0': '초기설정',
  '1': '사용자 제작공식',
  '2': '신마법공식 1.0',
  '3': '오리지널 마법공식',
  '4': '소형주 저pbr 전략',
  '5': '그레이엄의 마지막 선물',
  '6': '그레이엄의 마지막 선물 업그레이드',
};

export const RequestFSKeysToKoDesciption: Record<
  RequestFSKeys | IQuantPreset,
  string
> = {
  market_cap:
    '시가총액( market capitalization)은 주가와 발행 주식수를 곱한 것으로<br/> 상장회사 혹은 기업 가치를 평가하는 지표이다.',
  revenue:
    '매출액( sales volume,sales)은 제품이나 상품 등을 판매하고 얻은 대가이다. ',
  operating_income:
    '영업이익: EBIT(Earning before interest and taxes)라고도 하며, 매출총이익에서 판매관리비를 뺀 것이다. 기업이 경영하는 주된 사업의 수익성을 나타낸다.',
  EPS: '주당순이익(EPS)은 기업이 1주당 얼마의 순이익을 냈는가를 나타내는 지표이며 순이익(당기순이익)을 그 기업이 발행한 총 주식수로 나눈 값을(당기순이익/주식수) 말한다.',
  PER: 'PER은 Price Earning Ratio의 약자로서 직역하면 주가수익비율 이라고 합니다. 조금 더 풀어서 해석하면 기업의 1주당 벌어 들이는 순이익에 비해서 실제 주가가 몇 배가 되는지 나타내는 지표입니다',
  EV_per_EBITDA:
    '해당 기업의 내재가치(수익가치)와 기업가치를 비교하는 투자지표로, EV/EBITDA가 2배라면 그 기업을 시장 가격(EV)으로 매수했을 때 그 기업이 벌어들인 이익(EBITDA)을 2년간 합하면 투자원금을 회수할 수 있다는 의미다.',
  ROE: '자기자본이익률(Return On Equity, ROE)이란 기업이 자본을 이용하여 얼마만큼의 이익을 냈는지를 나타내는 지표로, 당기순이익 값을 자본 값으로 나누어 구한다.',
  dividend_yield:
    '배당수익률은 주가 대비 매년 얼마의 배당금을 지급하는지를 나타내는 비율입니다. 즉 현재 주가로 주식을 매수할 경우 배당으로 몇%의 수익률을 올릴 수 있는지 알 수 있습니다.',
  BETA: '베타란 금융에서 개별 주식이나 포트폴리오의 위험을 나타내는 상대적인 지표이다. 시장포트폴리오의 위험과 같은 기준이 되는 지표와의 상대적인 변동성비율등을 의미하며, CAPM등에 의해 개별자산과 포트폴리오의 위험을 측정하는 데 사용된다.',
  revenue_Q: '매출액(분기)',
  operating_income_Q: '영업이익(분기)',
  net_income_Q: '당기순이익',
  controlling_interest_Q: '당기순이익(재배)',
  non_controlling_interest_Q: '당기순이익(비재배)',
  total_assets_Q: '자산총계',
  total_stock_holders_Q: '자본총계',
  controlling_interest_rate_Q: '자본총계(비지배)',
  non_controlling_interest_share_Q: '자본총계(비지배)',
  capital_Q: '자본금',
  debt_ratio_Q:
    '부채비율 (Debt Ratio)는 기업의 부채와 자기자본과의 관계를 나타내는 안정성 지표입니다.',
  retention_rate_Q: '자본유보율',
  operating_margin_Q: '영업이익률',
  controlling_interest_share_Q: '순이익률',
  ROA_Q: 'ROA',
  ROE_Q: 'ROE',
  EPS_Q: 'EPS(원)',
  BPS_Q: 'BPS(원)',
  DPS_Q: 'DPS(원)',
  PBR_Q: 'PBR',
  outstanding_shares_Q: '발행주식수(보통주)',
  dividend_yield__Q:
    '배당수익률은 주가 대비 매년 얼마의 배당금을 지급하는지를 나타내는 비율입니다. 즉 현재 주가로 주식을 매수할 경우 배당으로 몇%의 수익률을 올릴 수 있는지 알 수 있습니다.',
  '0': '(설명)초기설정',
  '1': '(설명)사용자 제작공식',
  '2': '(설명)신마법공식 1.0',
  '3': '(설명)오리지널 마법공식',
  '4': '(설명)소형주 저pbr 전략',
  '5': '(설명)그레이엄의 마지막 선물',
  '6': '(설명)그레이엄의 마지막 선물 업그레이드',
};
