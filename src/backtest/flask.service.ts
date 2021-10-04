import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { StrategyService } from 'src/strategy/strategy.service';
import { LeftHandSideExpressionedNode } from 'ts-morph';
import {
  PushBackTestQInput,
  PushBackTestQOutput,
  SetBackTestOutput,
} from './dto/mutation.dtos';
import {
  RequestMiniBacktestingInput,
  RequestMiniBacktestingOutput,
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
  // (1) ??
  async setCorporationDBData() {
    try {
      // sido / sigungu 정보 써서 서버로 쏘면 됨
      const { data } = await axios.get(
        `${this.dataServerUrl}/DBinit/Corporation`,
      );
      return data;
    } catch (e) {
      console.error('[FAIL] GET test', e);
      return e;
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
        timeout: 10000,
      });
      if (status !== 201) {
        return { ok: false, ...data };
      }
      return { ok: true, ...data };
    } catch (e) {
      console.error('[FAIL] GET test', e);
      throw e;
    }
  }
  /**
   * (2) backtest 큐 넣기
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
  // (3) 작업 상태 점검 - task_id 입력
  async check(task_id: string) {
    try {
      const { data } = await axios.get(
        `${this.dataServerUrl}/check/${task_id}`,
      );
      return data;
    } catch (e) {
      console.error('[FAIL] GET test', e);
      return e;
    }
  }

  /**
   * 미니 백테스팅
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
        timeout: 15000,
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
}
