import { CorePaginationInput } from 'src/common/dtos/input.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Corporation, DailyStock } from '../entities';

// (1)
// 모든 Corporation list를 리턴
export class GetCorporationsInput {}

export class GetCorporationsOutput extends CoreOutput {
  corporations?: Corporation[];
}

// (2)
// 여러개의 Corporation을 검색
export class GetCorporationsWithTermInput {
  term: string; // Corporation code or Corporation name
}

export class GetCorporationsWithTermOutput extends CoreOutput {
  corporations?: Corporation[];
}

// (3)
// 한개의 Corporation을 검색
export class GetCorporationInput {
  term: string; // Corporation code or Corporation name
}

export class GetCorporationOutput extends CoreOutput {
  corporation?: Corporation;
}

// (4)
// 일봉 데이터 리턴
export class GetDayilStocksInput extends CorePaginationInput {
  term: string;
  // skip?: number;
  // take?: number;
}
export class GetDayilStocksOutput extends CoreOutput {
  dailyStocks?: DailyStock[];
}
