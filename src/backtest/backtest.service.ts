import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AddHistoryInput,
  AddHistoryOutput,
  DeleteHistoryInput,
  DeleteHistoryOutput,
  UpdateHistoryInput,
  UpdateHistoryOutput,
} from './dto/mutation.dtos';
import { GetHistoryListInput, GetHistoryListOutput } from './dto/query.dtos';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  InvestProfitInfo,
  History,
} from './entities';

@Injectable()
export class BacktestService {
  private readonly logger = new Logger(BacktestService.name);
  constructor(
    @InjectRepository(AccumulateProfitRateChart)
    private readonly accumulateProfitsRepo: Repository<AccumulateProfitRateChart>,
    @InjectRepository(BacktestDetailInfo)
    private readonly backtestDetailRepo: Repository<BacktestDetailInfo>,
    @InjectRepository(BacktestMontlyProfitRateChart)
    private readonly backtestMontlyProfitsRepo: Repository<BacktestMontlyProfitRateChart>,
    @InjectRepository(BacktestQueue)
    private readonly backtestQueueRepo: Repository<BacktestQueue>,
    @InjectRepository(BacktestWinRatio)
    private readonly backtestWinRatioRepo: Repository<BacktestWinRatio>,
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
    @InjectRepository(InvestProfitInfo)
    private readonly investInfoRepo: Repository<InvestProfitInfo>,
  ) {
    const test = async () => {
      // await this.historyRepo.save(
      //   this.historyRepo.create({
      //     strategy_code: 12,
      //     history_date: new Date().toISOString(),
      //   }),
      // );
      // const res = await this.historyRepo.delete([5, 6, 7, 8]);
      // console.log(res);
    };
    test();
  }

  // 전략에 대한 히스토리 획득
  async getHistoryList({
    strategy_code,
  }: GetHistoryListInput): Promise<GetHistoryListOutput> {
    try {
      const historyList = await this.historyRepo.find({
        where: { strategy_code },
      });
      return {
        ok: true,
        historyList,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  //전략에 대한 히스토리 append | concat
  async addHistory(historyInput: AddHistoryInput): Promise<AddHistoryOutput> {
    try {
      const history = await this.historyRepo.save(
        this.historyRepo.create(historyInput),
      );
      return {
        ok: true,
        history,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  //전략에 대한 히스토리 all hardDelete
  async deleteHistory({
    history_code,
  }: DeleteHistoryInput): Promise<DeleteHistoryOutput> {
    try {
      const { affected } = await this.historyRepo.delete(history_code);
      return {
        ok: true,
        affected,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false, affected: 0 };
    }
  }
  //전략에 대한 히스토리 update with id
  async updateHistory({
    history_code,
    buy_sale_price,
    history_date,
    profit_loss_rate,
    strategy_code,
    ticker,
  }: UpdateHistoryInput): Promise<UpdateHistoryOutput> {
    try {
      const history = await this.historyRepo.findOne({
        where: { history_code },
      });
      if (buy_sale_price) history.buy_sale_price = buy_sale_price;
      if (history_date) history.history_date = history_date;
      if (profit_loss_rate) history.profit_loss_rate = profit_loss_rate;
      if (strategy_code) history.strategy_code = strategy_code;
      if (ticker) history.ticker = ticker;

      await this.historyRepo.save(history);

      return { ok: true, history };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
}
