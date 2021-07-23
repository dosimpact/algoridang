import { Controller, Get, Param, Query } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('/api/finance/')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // stock --- api

  // 모든 종목들의 ticker를 출력
  @Get('corporations')
  async getCorporations() {
    return this.financeService.getCorporations();
  }
  @Get('corporations/:term')
  async getCorporationsWithTerm(@Param('term') term: string) {
    return this.financeService.getCorporationsWithTerm({ term });
  }

  // 존재하는 티커인지 검색
  @Get('corporation/:term')
  async getCorporation(@Param('term') term: string) {
    return this.financeService.getCorporation({ term });
  }

  // daily-stock --- api
  @Get('dailystock/:term')
  async getDailyStocks(
    @Param('term') term: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.financeService.getDailyStocks({ term, take, skip });
  }
}
