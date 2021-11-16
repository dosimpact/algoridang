import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { RequestQuantSelectInput } from 'src/backtest/dto/query.dtos';
import { HttpBodyCacheInterceptor } from 'src/common/interceptor/HttpCacheInterceptor';
import { QuantSelectionInput } from './dtos/query.dtos';
import { FinanceService } from './finance.service';

@UseInterceptors(HttpBodyCacheInterceptor)
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

  /**
   * (6-1) 퀀트 발굴에 대해서 제공하는 기능 출력
   * type - list : 어떤 전략들이 있는지
   * @param {lookupType} lookupType
   * @returns {QuantSelectionLookupListOutput}
   */
  @Version('1')
  @Get('statements/lookup/list')
  async quantSelectionLookupList() {
    return this.financeService.QuantSelectionLookupList();
  }
  /**
   * (6-2) 퀀트 발굴에 대해서 제공하는 기능 출력
   * type - default : 기본 셋팅 값
   * @param {number} index
   * @returns {QuantSelectionLookupTypeOutput}
   */
  @Version('1')
  @Get('statements/lookup/type/:index')
  async quantSelectionLookupType(@Param('index') index: number) {
    return this.financeService.QuantSelectionLookupType(Number(index));
  }
  /**
   * (7) 퀀트 발굴을 수행
   * @param {QuantSelectionInput} body
   * @returns {QuantSelectionOutput}
   */
  @Version('1')
  @Post('statements/select/')
  async quantSelection(@Body() body: QuantSelectionInput) {
    return this.financeService.QuantSelection(body);
  }

  // (5) 특정 종목에 대한 재무 정보 리턴
  @Version('1')
  @Get('statements/:ticker')
  async getFinancialStatements(@Param('ticker') ticker: string) {
    return this.financeService.getFinancialStatements({ ticker });
  }
}
