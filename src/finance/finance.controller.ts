import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ErrorHandlerInterceptor } from 'src/common/service/ErrorHandlerInterceptor';
import { HttpCacheInterceptor } from 'src/common/service/HttpCacheInterceptor';
import { LoggingInterceptor } from 'src/common/service/LogginInterceptor';
import { FinanceService } from './finance.service';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ErrorHandlerInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/finance/')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // stock --- api

  // (1) 기업 리스트 출력
  @Get('corporations')
  async getCorporations() {
    return this.financeService.getCorporations();
  }
  // (2) 기업 리스트 출력 (검색어 기능 )
  @Get('corporations/:term')
  async getCorporationsWithTerm(@Param('term') term: string) {
    return this.financeService.getCorporationsWithTerm({ term });
  }

  // (3) 기업 리스트 출력 (검색어 기능 )
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
    @Query('sort') sort: string,
  ) {
    return this.financeService.getDailyStocks({ term, take, skip, sort });
  }
}
