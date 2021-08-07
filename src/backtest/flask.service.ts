import { Injectable } from '@nestjs/common';
import { integer } from 'aws-sdk/clients/cloudfront';
import axios from 'axios';
let dataServerUrl= 'http://3.34.123.79:5000'
@Injectable()
export class FlaskService {
  constructor() {
  }

  async setCorporationDBData() {
    try {
      // sido / sigungu 정보 써서 서버로 쏘면 됨
      const { data } = await axios.get(
        `${dataServerUrl}/DBinit/Corporation`,
      );
      return data;
    } catch (e) {
      console.error('[FAIL] GET test', e);
      return e;
    }
  }
  
  async setBackTest(strategyCodedata: integer) {
    try {
      const { data , request} = await axios({
        method: 'post',
        url: `${dataServerUrl}/backtest`,
        data: {
          "strategyCode" : strategyCodedata
        },
        headers: {  
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'}
      });


      return data;
    } catch (e) {
      console.error('[FAIL] GET test', e);
      return e;
    }
  }

  async check(id: string) {
    
    try {
      
      const { data } = await axios.get(
        `${dataServerUrl}/check/${id}`,
      );
      return data;
    } catch (e) {
      console.error('[FAIL] GET test', e);
      return e;
    }
  }

  
}
