import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import {
  GetAccumulateProfitRateChartListInput,
  GetAccumulateProfitRateChartListOutput,
  GetBacktestWinRatioInput,
  GetBacktestWinRatioOutput,
  GetDailyProfitRateChartListInput,
  GetDailyProfitRateChartListOutput,
  GetHistoryListInput,
  GetHistoryListOutput,
  GetMontlyProfitRateChartListInput,
  GetMontlyProfitRateChartListOutput,
} from './dto/query.dtos';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  InvestProfitInfo,
  History,
  BacktestDailyProfitRateChart,
} from './entities';

@Injectable()
export class BacktestService {
  private readonly logger = new Logger(BacktestService.name);
  constructor(
    @InjectRepository(AccumulateProfitRateChart)
    private readonly accumulateProfitRepo: Repository<AccumulateProfitRateChart>,

    @InjectRepository(BacktestDetailInfo)
    private readonly DetailRepo: Repository<BacktestDetailInfo>,
    @InjectRepository(BacktestMontlyProfitRateChart)
    private readonly montlyProfitRateRepo: Repository<BacktestMontlyProfitRateChart>,

    @InjectRepository(BacktestDailyProfitRateChart)
    private readonly dailyProfitRateRepo: Repository<BacktestDailyProfitRateChart>,

    @InjectRepository(BacktestQueue)
    private readonly backtestQueueRepo: Repository<BacktestQueue>,

    @InjectRepository(BacktestWinRatio)
    private readonly backtestWinRatioRepo: Repository<BacktestWinRatio>,

    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,

    @InjectRepository(InvestProfitInfo)
    private readonly investProfitInfoRepo: Repository<InvestProfitInfo>,
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

  /**
   * 1 전략에 대한 히스토리 요청
   * @param strategy_code
   * @returns historyList
   */
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
      throw error;
    }
  }

  /**
   * 2 전략에 대한 차트 - 누적 수익률
   * @param strategy_code
   * @returns AccumulateProfitRateChart[]
   */
  async getAccumulateProfitRateChartList({
    strategy_code,
  }: GetAccumulateProfitRateChartListInput): Promise<GetAccumulateProfitRateChartListOutput> {
    try {
      const accumulateProfitRateChartList =
        await this.accumulateProfitRepo.find({
          where: { strategy_code },
        });
      return {
        accumulateProfitRateChartList,
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * 3 전략에 대한 차트 - 월간 수익률
   * @param strategy_code
   * @returns MontlyProfitRateChart[]
   */
  async getMontlyProfitRateChartList({
    strategy_code,
  }: GetMontlyProfitRateChartListInput): Promise<GetMontlyProfitRateChartListOutput> {
    try {
      const montlyProfitRateChartList = await this.montlyProfitRateRepo.find({
        where: { strategy_code },
      });
      return {
        montlyProfitRateChartList,
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * 4 전략에 대한 차트 - 일간 수익률
   * @param strategy_code
   * @returns DailyProfitRateChart[]
   */
  async getDailyProfitRateChartList({
    strategy_code,
  }: GetDailyProfitRateChartListInput): Promise<GetDailyProfitRateChartListOutput> {
    try {
      const dailyProfitRateChartList = await this.dailyProfitRateRepo.find({
        where: { strategy_code },
      });
      return { dailyProfitRateChartList, ok: true };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * 5 전략에 대한 차트 - 승률
   * @param strategy_code
   * @returns BacktestWinRatio
   */
  async getBacktestWinRatio({
    strategy_code,
  }: GetBacktestWinRatioInput): Promise<GetBacktestWinRatioOutput> {
    const backtestWinRatio = await this.backtestWinRatioRepo.findOneOrFail({
      where: { strategy_code },
    });
    return { backtestWinRatio, ok: true };
  }

  /**
   * 5 전략에 대한 차트 - 승률
   */
  async getQuantstatesReport({ strategy_code }: GetBacktestWinRatioInput) {
    const detailInfo = await this.DetailRepo.findOneOrFail({
      where: { strategy_code },
      select: ['quant_state_report'],
    });
    if (
      detailInfo.quant_state_report &&
      detailInfo.quant_state_report.length >= 100
    ) {
      return detailInfo.quant_state_report;
    } else {
      return `해당 전략코드는 퀀트 리포트가 없습니다.`;
      // throw new NotFoundException(
      //   `strategy_code(${strategy_code}) has no report`,
      // );
    }
  }

  // -------------mutation-------------
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

  // ------------- server - invest profit info -------------
  async getHighProfitRateStrategyCodes(): Promise<string[]> {
    const res = await this.investProfitInfoRepo.find({
      order: {
        profit_rate: 'ASC',
      },
      select: ['strategy_code'],
      take: 20,
    });
    if (!res) {
      return [];
    }
    return res.map((r) => r.strategy_code);
  }

  // update investProfitInfo
  async __updateInvestProfitInfo(investProfitInfo: Partial<InvestProfitInfo>) {
    return this.investProfitInfoRepo.save(investProfitInfo);
  }
}
