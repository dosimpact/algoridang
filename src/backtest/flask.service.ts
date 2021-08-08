import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class FlaskService {
  private readonly dataServerUrl: string;
  constructor(private readonly configService: ConfigService) {
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
  async setBackTest(strategyCode: number) {
    try {
      const { data, request } = await axios({
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
      return data;
    } catch (e) {
      console.error('[FAIL] GET test', e);
      return e;
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
