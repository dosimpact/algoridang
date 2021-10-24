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
