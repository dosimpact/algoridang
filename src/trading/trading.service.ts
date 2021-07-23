import { Injectable } from '@nestjs/common';
import { CreateTradingDto } from './dto/create-trading.dto';
import { UpdateTradingDto } from './dto/update-trading.dto';

@Injectable()
export class TradingService {
  create(createTradingDto: CreateTradingDto) {
    return 'This action adds a new trading';
  }

  findAll() {
    return `This action returns all trading`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trading`;
  }

  update(id: number, updateTradingDto: UpdateTradingDto) {
    return `This action updates a #${id} trading`;
  }

  remove(id: number) {
    return `This action removes a #${id} trading`;
  }
  //   (GET)tradingStrategyList		매매전략리스트 { 기본 셋팅 }	(1) 매매전략 리스트 요청
  // (POST)createTradingStrategy	tradingStragetyCode
  // settingJson		(2) (관리자) 메매전략 생성 요청
}
