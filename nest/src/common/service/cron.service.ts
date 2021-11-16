import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { BacktestService } from 'src/backtest/backtest.service';
import { FlaskService } from 'src/backtest/flask.service';
import { Corporation } from 'src/finance/entities';
import { StrategyService } from 'src/strategy/strategy.service';

@Injectable()
export class CronService {
  private readonly PORT: string;
  private readonly SELF_URL: string;
  private readonly logger = new Logger(CronService.name);
  constructor(
    private readonly config: ConfigService,
    private readonly backtestService: BacktestService,
    private readonly flaskService: FlaskService,
    private readonly strategyService: StrategyService,
  ) {
    this.PORT = config.get('PORT') || '4000';
    this.SELF_URL = `http://localhost:${this.PORT}`;
  }

  /**
   * 매일 밤 12마다  일봉 데이터를 캐싱처리 합니다.
   */
  //@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCronTickerPrice() {
    console.time('cache-ticker-price');
    this.logger.verbose('🚀 Ticker Price Data CachingStart');
    await this.cachTickerPriceData();
    this.logger.verbose(
      `✔ Ticker Price Data Caching Fin ${console.timeEnd(
        'cache-ticker-price',
      )}`,
    );
  }

  private async cachTickerPriceData() {
    try {
      const res = await axios({
        url: this.SELF_URL + '/v1/api/finance/corporations',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const corporations: Corporation[] = res.data.corporations;
      this.logger.verbose(
        '✔ corporations(length) will cahing...',
        corporations.length,
      );
      for (let i = 0; i < corporations.length; i++) {
        const res = await axios({
          url:
            this.SELF_URL +
            `/v1/api/finance/dailystocks/${corporations[i].ticker}?skip=0&take=1095&sort=ASC`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.logger.verbose(
          `✔ ticker ${corporations[i].ticker}${res.data.dailyStocks.length} cached!`,
        );
      }
    } catch (error) {
      this.logger.error(`error : ${error.message}`);
    }
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCronBackTestRetry() {
    console.time('BackTestRetry');
    this.logger.verbose('🚀 BackTestRetry');
    await this.retryUnsuccessfulBacktest();
    console.timeEnd('BackTestRetry');
  }
  private async retryUnsuccessfulBacktest() {
    const strategies = await this.strategyService.__getStrategyUnsuccess();
    this.logger.verbose(
      `✔ number of strategies will Retry ${strategies.length}`,
    );
    for (let i = 0; i < strategies.length; i++) {
      await this.flaskService.__requestBackTest(
        Number(strategies[i].strategy_code),
      );
      this.logger.verbose(
        `✔ BackTestRetry strategy_code ${strategies[i].strategy_code}`,
      );
    }
  }
}
