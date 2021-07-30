import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  // 전략에 대한 히스토리 획득
  async getHistoryList() {}
  //전략에 대한 히스토리 append | concat
  async addHistory() {}
  //전략에 대한 히스토리 all hardDelete
  async deleteHistory() {}
  //전략에 대한 히스토리 update with id
  async updateHistory() {}
}
