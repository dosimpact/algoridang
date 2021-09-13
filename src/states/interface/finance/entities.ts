import { Universal } from "../trading/entities";

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
