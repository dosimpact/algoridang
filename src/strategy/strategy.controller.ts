import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Controller('strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}
  // (GET) getStrategyListNew	(1) 신규 투자 전략 API
  async getStrategyListNew() {}
  // (GET) getStrategyListHighView (2) 조회수 높은 투자 전략 API
  async getStrategyListHighView() {}
  // (GET) getStrategyListType(3) 위험추구/중립형/수익안정형 API
  async getStrategyListType() {}
  // (GET) getStrategyById	(4)특정 Id로 전략 조회
  async getStrategyById() {}
  // (GET) getMyStrategyListById(5) 나의 전략 조회(리스트)
  async getMyStrategyListById() {}
  // (GET) getMyStrategyById(6) 나의 전략 조회
  async getMyStrategyById() {}

  // (POST) createMyStrategy	(1) 전략 만들기
  async createMyStrategy() {}
  // (POST) updateMyStrategyById		(2) 나의 전략 업데이트
  async updateMyStrategyById() {}
  // (POST) deleteMyStrategyById	 	(3) 나의 전략 softdelete
  async deleteMyStrategyById() {}
  // (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
  async recoverStrategyById() {}
  // (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
  async noticeMyStrategyById() {}
  // (POST) copyStrategy	id		(1) 투자 전략 복사  ( API )
  async copyStrategy() {}
}
