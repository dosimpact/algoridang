import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { StrategyService } from 'src/strategy/strategy.service';
import {
  PushBackTestQInput,
  PushBackTestQOutput,
  SetBackTestOutput,
} from './dto/mutation.dtos';

@Injectable()
export class FlaskService {
  private readonly dataServerUrl: string;
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => StrategyService))
    private readonly strategyService: StrategyService,
  ) {
    this.dataServerUrl = this.configService.get('DATA_SERVER_URL');
  }
  // (0) health Check
  async healthCheck() {
    try {
      const { status } = await axios.get(`${this.dataServerUrl}`);
      if (status === 200) return true;
      return false;
    } catch (error) {
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
  async __setBackTest(strategyCode: number): Promise<SetBackTestOutput> {
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
  // (2) backtest 큐 넣기
  async pushBackTestQ(
    email_id: string,
    { strategy_code }: PushBackTestQInput,
  ): Promise<PushBackTestQOutput> {
    const res = await this.strategyService.__checkMyStrategy(email_id, {
      strategy_code,
    });
    if (res.ok) {
      return this.__setBackTest(Number(strategy_code));
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
}
