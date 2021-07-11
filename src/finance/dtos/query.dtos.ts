import { CoreOutput } from 'src/common/dtos/output.dto';
import { DAILY_STOCK } from '../entities/daliy-stock.entity';
import { STOCK } from '../entities/stock.entity';

// 모든 stock list를 리턴
export class GetStocksInput {}

export class GetStocksOutput extends CoreOutput {
  stocks?: STOCK[];
}

// 여러개의 stock을 검색
export class GetStocksWithTermInput {
  term: string; // stock code or stock name
}

export class GetStocksWithTermOutput extends CoreOutput {
  stocks?: STOCK[];
}

// 한개의 stock을 검색
export class GetStockInput {
  term: string; // stock code or stock name
}

export class GetStockOutput extends CoreOutput {
  stock?: STOCK;
}

// stock price 리턴
export class GetDayilStocksInput {
  term: string;
  skip?: number;
  take?: number;
}
export class GetDayilStocksOutput extends CoreOutput {
  dailyStocks?: DAILY_STOCK[];
}
