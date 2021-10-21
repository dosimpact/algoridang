import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Corporation } from 'src/finance/entities';

@Injectable()
export class CronService {
  private readonly PORT: string;
  private readonly SELF_URL: string;
  private readonly logger = new Logger(CronService.name);
  constructor(config: ConfigService) {
    this.PORT = config.get('PORT') || '4000';
    this.SELF_URL = `http://localhost:${this.PORT}`;
  }

  //   @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
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
}
