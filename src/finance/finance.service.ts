import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Like, Raw, Repository } from 'typeorm';
import {
  GetCorporationInput,
  GetCorporationOutput,
  GetCorporationsWithTermOutput,
  GetDayilStocksInput,
  GetDayilStocksOutput,
  GetCorporationsOutput,
  GetCorporationsWithTermInput,
  GetFinancialStatementOutput,
  GetFinancialStatementInput,
} from './dtos/query.dtos';
import {
  Category,
  CategoryList,
  Corporation,
  DailyStock,
} from './entities/index';
import { execSync } from 'child_process';
import { join } from 'path';
import { FlaskService } from '../backtest/flask.service';
import {
  RequestQuantSelectDefaultOutput,
  RequestQuantSelectInput,
  RequestQuantSelectLookUpOutput,
  RequestQuantSelectOutput,
} from 'src/backtest/dto/query.dtos';
// import { promisify } from 'util';

// 👨‍💻 FinanceService 의 책임이 막중하다.
// > 서비스 단위를 나눌필요성..?
// eg) 가격데이터관련 서비스, 회사관련 서비스
// >여러 레포가 필요한 서비스라면?

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepo: Repository<Category>,
    @InjectRepository(CategoryList)
    private readonly CategoryListRepo: Repository<CategoryList>,
    @InjectRepository(Corporation)
    private readonly CorporationRepo: Repository<Corporation>,
    @InjectRepository(DailyStock)
    private readonly DailyStockRepo: Repository<DailyStock>,
    @Inject(forwardRef(() => FlaskService))
    private readonly flaskService: FlaskService,
  ) {}

  // (1) 모든 회사들의 리스트를 리턴
  async getCorporations(): Promise<GetCorporationsOutput> {
    const corporations = await this.CorporationRepo.find({});
    return {
      ok: true,
      corporations,
    };
  }
  // (2) 검색어로, 회사들의 리스트를 리턴
  async getCorporationsWithTerm({
    term,
  }: GetCorporationsWithTermInput): Promise<GetCorporationsWithTermOutput> {
    const corporations = await this.CorporationRepo.find({
      where: [{ ticker: Like(`%${term}%`) }, { corp_name: Like(`%${term}%`) }],
    });
    if (!corporations)
      throw new EntityNotFoundError(
        Corporation,
        `cannot find stock by ${term}`,
      );
    return {
      ok: true,
      corporations,
    };
  }

  // (3) 회사정보 하나를 검색합니다.
  async getCorporation({
    term,
  }: GetCorporationInput): Promise<GetCorporationOutput> {
    const corporation = await this.CorporationRepo.findOneOrFail({
      where: [{ ticker: Like(`%${term}%`) }, { corp_name: Like(`%${term}%`) }],
    });
    return {
      ok: true,
      corporation,
    };
  }

  // (4) 가격데이터를 검색합니다.
  async getDailyStocks({
    term,
    skip,
    take,
    sort,
  }: GetDayilStocksInput): Promise<GetDayilStocksOutput> {
    const dailyStocks = await this.DailyStockRepo.find({
      where: {
        ticker: term,
      },
      order: {
        stock_date: 'DESC',
      },
      skip: skip || 0,
      take: take || 365,
    });
    if (sort === 'ASC') {
      dailyStocks.reverse();
    }
    if (!dailyStocks)
      throw new EntityNotFoundError(
        DailyStock,
        `cannot find dailystock with term ${term}`,
      );
    return {
      ok: true,
      dailyStocks,
    };
  }

  // (7) 특정 종목을가진 전략 코드들 반환
  async searchTickerByTerm(term: string) {
    return await this.CorporationRepo.find({
      where: [
        { ticker: Raw((ticker) => `${ticker} ILIKE '${term}'`) },
        { corp_name: Raw((corp_name) => `${corp_name} ILIKE '${term}'`) },
      ],
    });
  }

  async getFinancialStatements({}: GetFinancialStatementInput): Promise<GetFinancialStatementOutput> {
    return {
      ok: false,
      error: 'not yet',
    };
  }

  async FS_Selection(
    body: RequestQuantSelectInput,
  ): Promise<RequestQuantSelectOutput> {
    return this.flaskService.__requestQuantSelection(body);
  }

  async FS_SelectionLookupList(): Promise<RequestQuantSelectLookUpOutput> {
    return this.flaskService.__requestQuantSelectLookUp();
  }
  async FS_SelectionLookupType(
    index: number,
  ): Promise<RequestQuantSelectDefaultOutput> {
    return this.flaskService.__requestQuantSelectDefault(index);
  }
  async FS_SelectionLookupAll() {}
}
