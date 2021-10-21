import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { HttpCacheInterceptor } from 'src/common/interceptor/HttpCacheInterceptor';
import { FinanceService } from './finance.service';

@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/finance/')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // (1) 기업 리스트 출력
  @Version('1')
  @Get('corporations')
  async getCorporations() {
    return this.financeService.getCorporations();
  }
  // (2) 기업 리스트 출력 (검색어 기능 )
  @Version('1')
  @Get('corporations/:term')
  async getCorporationsWithTerm(@Param('term') term: string) {
    return this.financeService.getCorporationsWithTerm({ term });
  }

  // refactor 필요한가?
  // (3) 기업 리스트 출력 (검색어 기능 )
  @Version('1')
  @Get('corporation/:term')
  async getCorporation(@Param('term') term: string) {
    return this.financeService.getCorporation({ term });
  }

  // daily-stock --- api
  // (4) 일간 가격 데이터 출력
  @Version('1')
  @Get('dailystocks/:term')
  async getDailyStocks(
    @Param('term') term: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('sort') sort: string,
  ) {
    return this.financeService.getDailyStocks({ term, take, skip, sort });
  }

  @Version('1')
  @Get('financial-statements/:ticker')
  async getFinancialStatements(@Param('ticker') ticker: string) {
    return this.financeService.getFinancialStatements({ ticker });
  }
}
