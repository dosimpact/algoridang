import { CoreOutput, CorePaginationInput } from '../common/dtos';
import { Corporation, DailyStock } from './entities';

// (1)
// 모든 Corporation list를 리턴
export interface GetCorporationsInput {}

export interface GetCorporationsOutput extends CoreOutput {
  corporations?: Corporation[];
}

// (2)
// 여러개의 Corporation을 검색
export interface GetCorporationsWithTermInput {
  term: string; // Corporation code or Corporation name
}

export interface GetCorporationsWithTermOutput extends CoreOutput {
  corporations?: Corporation[];
}

// (3)
// 한개의 Corporation을 검색
export interface GetCorporationInput {
  term: string; // Corporation code or Corporation name
}

export interface GetCorporationOutput extends CoreOutput {
  corporation?: Corporation;
}

export interface GetDayilStocksInput extends CorePaginationInput {
  term: string;
  sort?: 'DESC' | 'ASC';
}
export interface GetDayilStocksOutput extends CoreOutput {
  dailyStocks?: DailyStock[];
}
