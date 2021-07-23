import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  GetCorporationInput,
  GetCorporationOutput,
  GetCorporationsWithTermOutput,
  GetDayilStocksInput,
  GetDayilStocksOutput,
  GetCorporationsOutput,
  GetCorporationsWithTermInput,
} from './dtos/query.dtos';
import {
  Category,
  CategoryList,
  Corporation,
  DailyStock,
} from './entities/index';

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
  ) {}

  // (1) 모든 회사들의 리스트를 리턴
  async getCorporations(): Promise<GetCorporationsOutput> {
    try {
      const corporations = await this.CorporationRepo.find({});
      return {
        ok: true,
        corporations,
      };
    } catch (error) {}
  }
  // (2) 검색어로, 회사들의 리스트를 리턴
  async getCorporationsWithTerm({
    term,
  }: GetCorporationsWithTermInput): Promise<GetCorporationsWithTermOutput> {
    try {
      const corporations = await this.CorporationRepo.find({
        where: [
          { ticker: Like(`%${term}%`) },
          { corp_name: Like(`%${term}%`) },
        ],
      });
      return {
        ok: true,
        corporations,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find stock by ${term}`,
      };
    }
  }

  // (3) 회사정보 하나를 검색합니다.
  async getCorporation({
    term,
  }: GetCorporationInput): Promise<GetCorporationOutput> {
    try {
      const corporation = await this.CorporationRepo.findOneOrFail({
        where: [
          { ticker: Like(`%${term}%`) },
          { corp_name: Like(`%${term}%`) },
        ],
      });
      return {
        ok: true,
        corporation,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find stock by ${term}`,
      };
    }
  }

  // (4) 가격데이터를 검색합니다.
  async getDailyStocks({
    term,
    skip,
    take,
  }: GetDayilStocksInput): Promise<GetDayilStocksOutput> {
    try {
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
      return {
        ok: true,
        dailyStocks,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find dailystock with term ${term}`,
      };
    }
  }
}
