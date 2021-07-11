import { Controller, Get, Param, Query } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('/api/finance/')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // stock --- api

  // 모든 종목들의 ticker를 출력
  @Get('stocks')
  async getStocks() {
    return this.financeService.getStocks();
  }
  @Get('stocks/:term')
  async getStocksWithTerm(@Param('term') term: string) {
    return this.financeService.getStocksWithTerm({ term });
  }

  // 존재하는 티커인지 검색
  @Get('stock/:term')
  async getStock(@Param('term') term: string) {
    return this.financeService.getStock({ term });
  }

  // daily-stock --- api
  @Get('dailystock/:term')
  async getDailyStock(
    @Param('term') term: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.financeService.getDailyStocks({ term, take, skip });
  }
}
