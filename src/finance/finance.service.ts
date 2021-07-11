import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  GetStocksInput,
  GetStocksOutput,
  GetStockInput,
  GetStockOutput,
  GetStocksWithTermInput,
  GetStocksWithTermOutput,
  GetDayilStocksInput,
  GetDayilStocksOutput,
} from './dtos/query.dtos';
import { DAILY_STOCK } from './entities/daliy-stock.entity';
import { STOCK_CATEGORY } from './entities/stock-category';
import { STOCK_CATEGORY_LIST } from './entities/stock-category-list';
import { STOCK } from './entities/stock.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(STOCK)
    private readonly STOCK_REPO: Repository<STOCK>,
    @InjectRepository(STOCK_CATEGORY)
    private readonly STOCK_CATEGORY_REPO: Repository<STOCK_CATEGORY>,
    @InjectRepository(STOCK_CATEGORY_LIST)
    private readonly STOCK_CATEGORY_LIST_REPO: Repository<STOCK_CATEGORY_LIST>,
    @InjectRepository(DAILY_STOCK)
    private readonly DAILY_STOCK_REPO: Repository<DAILY_STOCK>,
  ) {}

  async getStocks(): Promise<GetStocksOutput> {
    try {
      const stocks = await this.STOCK_REPO.find({});
      return {
        ok: true,
        stocks,
      };
    } catch (error) {}
  }
  async getStocksWithTerm({
    term,
  }: GetStocksWithTermInput): Promise<GetStocksWithTermOutput> {
    try {
      const stocks = await this.STOCK_REPO.find({
        where: [
          { STOCK_CODE: Like(`%${term}%`) },
          { STOCK_NAME: Like(`%${term}%`) },
        ],
      });
      return {
        ok: true,
        stocks,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find stock by ${term}`,
      };
    }
  }

  async getStock({ term }: GetStockInput): Promise<GetStockOutput> {
    try {
      const stock = await this.STOCK_REPO.findOneOrFail({
        where: [
          { STOCK_CODE: Like(`%${term}%`) },
          { STOCK_NAME: Like(`%${term}%`) },
        ],
      });
      return {
        ok: true,
        stock,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find stock by ${term}`,
      };
    }
  }

  async getDailyStocks({
    term,
    skip,
    take,
  }: GetDayilStocksInput): Promise<GetDayilStocksOutput> {
    try {
      const DAILY_STOCKS = await this.DAILY_STOCK_REPO.find({
        where: {
          STOCK_CODE: term,
        },
        order: {
          DATE: 'DESC',
        },
        skip: skip || 0,
        take: take || 365,
      });
      return {
        ok: true,
        dailyStocks: DAILY_STOCKS,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find dailystock with term ${term}`,
      };
    }
  }
}
