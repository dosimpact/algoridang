import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { StrategyService } from 'src/strategy/strategy.service';

import {
  PushBackTestQInput,
  PushBackTestQOutput,
  SetBackTestOutput,
} from './dto/mutation.dtos';
import {
  RequestMiniBacktestingInput,
  RequestMiniBacktestingOutput,
  RequestQuantSelectDefaultOutput,
  RequestQuantSelectInput,
  RequestQuantSelectLookUpOutput,
  RequestQuantSelectOutput,
} from './dto/query.dtos';

@Injectable()
export class FlaskService {
  private readonly dataServerUrl: string;
  private readonly logger = new Logger(FlaskService.name);
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => StrategyService))
    private readonly strategyService: StrategyService,
  ) {
    this.dataServerUrl = this.configService.get('DATA_SERVER_URL');
    // ✅ check flask server healtCheck notice
    this.healthCheck();
  }
  // (0) health Check
  async healthCheck() {
    try {
      const { status } = await axios({
        method: 'get',
        url: `${this.dataServerUrl}`,
        timeout: 5000,
      });
      if (status === 200) {
        this.logger.verbose(
          `✔️ DA Server connection check ${this.dataServerUrl}`,
        );
        return true;
      } else {
        this.logger.error(
          `❌ DA Server connection check ${this.dataServerUrl}`,
        );
        return false;
      }
    } catch (error) {
      this.logger.error(
        `❌️ DA Server connection AxiosError ${this.dataServerUrl}`,
      );
      console.log(error.message);

      return false;
    }
  }

  // (2) backtest 실행, - strategyCode 입력
  async __requestBackTest(strategyCode: number): Promise<SetBackTestOutput> {
    try {
      const { data, status } = await axios({
        method: 'post',
        url: `${this.dataServerUrl}/backtest`,
        data: {
          strategyCode,
        },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        timeout: 15 * 1000,
      });
      if (status !== 201) {
        return { ok: false, ...data };
      }
      return { ok: true, ...data };
    } catch (e) {
      this.logger.error(
        `❌️ DA Server connection AxiosError ${this.dataServerUrl}`,
      );
      throw e;
    }
  }
  /**
   * (2) backtest 실행, - strategyCode 입력
   * - email_id가 가진 전략인지 확인 후 큐 요청
   * @param {string} email_id
   * @param {PushBackTestQInput} pushBackTestQInput
   * @returns
   */
  async pushBackTestQ(
    email_id: string,
    { strategy_code }: PushBackTestQInput,
  ): Promise<PushBackTestQOutput> {
    const res = await this.strategyService.__checkMyStrategy(email_id, {
      strategy_code,
    });
    if (res.ok) {
      return this.__requestBackTest(Number(strategy_code));
    } else {
      throw new UnauthorizedException('cannot access strategy');
    }
  }

  /**
   * (3)  미니 백테스팅
   * - email_id가 가진 전략인지 확인 후 큐 요청
   * @param {RequestMiniBacktestingInput} pushBackTestQInput
   * @returns {RequestMiniBacktestingOutput} RequestMiniBacktestingOutput
   */
  async __requestMiniBacktesting(
    requestMiniBacktestingInput: RequestMiniBacktestingInput,
  ): Promise<RequestMiniBacktestingOutput> {
    try {
      const { data, status } = await axios({
        method: 'post',
        url: `${this.dataServerUrl}/minibacktest/minibacktest`,
        data: requestMiniBacktestingInput,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        timeout: 60 * 1000,
      });
      if (status !== 201) {
        this.logger.verbose('❌ requestMiniBacktesting');
        return { ok: false, ...data };
      }
      this.logger.verbose('✔ requestMiniBacktesting');
      return { ok: true, ...data };
    } catch (e) {
      console.error('[FAIL] GET test', e);
      throw e;
    }
  }
  /**
   * (4)  퀀트 발굴 - 적용된 파라미터로 종목을 발굴합니다.
   * @param {RequestQuantSelectInput} RequestQuantSelectInput
   * @returns {Promise<RequestQuantSelectOutput>} RequestQuantSelectOutput
   */

  async __requestQuantSelection(
    body: RequestQuantSelectInput,
  ): Promise<RequestQuantSelectOutput> {
    const { data, status } = await axios({
      method: 'post',
      url: `${this.dataServerUrl}/quant`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      timeout: 15 * 1000,
    });
    if (status !== 201) {
      return { ok: false, result: data };
    }
    return { ok: true, result: data };
  }

  /**
   * (5)  퀀트 발굴 - 어떤 전략이 가능한지 리스트업 - 결과 리턴
   * @param {}
   * @returns {Promise<RequestQuantSelectLookUpOutput>} RequestQuantSelectLookUpOutput
   */
  async __requestQuantSelectLookUp(): Promise<RequestQuantSelectLookUpOutput> {
    try {
      const { data, status } = await axios({
        method: 'get',
        url: `${this.dataServerUrl}/quant/lookup`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        timeout: 15 * 1000,
      });
      if (status !== 201) {
        return { ok: false, ...data };
      }
      return { ok: true, ...data };
    } catch (e) {
      this.logger.error(
        `❌️ DA Server connection AxiosError ${this.dataServerUrl}`,
      );
      throw e;
    }
  }
  /**
   * (6)  퀀트 발굴 - 공식별 파라미터를 보여줍니다.
   * @param {number} index
   * @returns {Promise<RequestQuantSelectLookUpOutput>} RequestQuantSelectLookUpOutput
   */
  async __requestQuantSelectDefault(
    index: number,
  ): Promise<RequestQuantSelectDefaultOutput> {
    try {
      const { data, status } = await axios({
        method: 'get',
        url: `${this.dataServerUrl}/quant/sample?index=${index}`,
        data: {},
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        timeout: 15 * 1000,
      });
      if (status !== 201) {
        return { ok: false, ...data };
      }
      return { ok: true, ...data };
    } catch (e) {
      this.logger.error(
        `❌️ DA Server connection AxiosError ${this.dataServerUrl}`,
      );
      throw e;
    }
  }
}
