import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import { HttpCacheInterceptor } from 'src/common/service/HttpCacheInterceptor';
import { CreateMyStrategyInput } from './dto/mutation.dtos';
import { MemberInfo } from 'src/member/entities';
import { TradingService } from 'src/trading/trading.service';
import { AddUniversalInput } from 'src/trading/dto/mutation.dtos';

@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/strategy/')
export class StrategyQueryController {
  constructor(private readonly strategyService: StrategyService) {}
  // (GET) getStrategyListNew	(1) 신규 투자 전략 API
  @Version('1')
  @Get('new')
  async getStrategyListNew() {
    return this.strategyService.getStrategyListNew({});
  }
  // (GET) getStrategyListHighView (2) 조회수 높은 투자 전략 API
  @Version('1')
  @Get('high_view')
  async getStrategyListHighView() {
    return this.strategyService.getStrategyListHighView({});
  }
  // (GET) getStrategyListType(3) 위험추구/중립형/수익안정형 API
  @Version('1')
  @Get('type')
  async getStrategyListType() {
    return this.strategyService.getStrategyListType({});
  }

  // (GET) getMyStrategyListById (5) 나의 전략 조회(리스트)
  @Roles(['Any'])
  @Version('1')
  @Get('my')
  async getMyStrategyList(@AuthUser() MemberInfo) {
    return this.strategyService.getMyStrategyList({
      email_id: MemberInfo.email_id,
    });
  }
  // (GET) getMyStrategyById(6) 나의 전략 조회
  @Roles(['Any'])
  @Version('1')
  @Get('my/:strategy_code')
  async getMyStrategyById(
    @AuthUser() MemberInfo,
    @Param('strategy_code') strategy_code,
  ) {
    return this.strategyService.getMyStrategyById({
      strategy_code,
      email_id: MemberInfo.email_id,
    });
  }

  // (GET) getStrategyById	(4)특정 Id로 전략 조회
  @Version('1')
  @Get(':strategy_code')
  async getStrategyById(@Param('strategy_code') strategy_code) {
    return this.strategyService.getStrategyById({ strategy_code });
  }
}

@Controller('/api/strategy/')
export class StrategyMutationController {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly tradingService: TradingService,
  ) {}

  // (POST) createMyStrategy	(1) 나의 전략 만들기
  @Roles(['Any'])
  @Version('1')
  @Post('my')
  async createMyStrategy(
    @AuthUser() member: MemberInfo,
    @Body() createMyStrategy: CreateMyStrategyInput,
  ) {
    return this.strategyService.createMyStrategy(member.email_id, {
      ...createMyStrategy,
    });
  }

  // 전략에 종목 + 매매전략 추가하기
  @Roles(['Any'])
  @Version('1')
  @Post('my/:strategy_code/universal')
  async addUniversal(
    @AuthUser() m: MemberInfo,
    @Body() body: AddUniversalInput,
  ) {
    return this.tradingService.addUniversal(m.email_id, body);
  }

  // (POST) updateMyStrategyById		(2) 나의 전략 업데이트
  async updateMyStrategyById() {}
  // (POST) deleteMyStrategyById	 	(3) 나의 전략 softdelete
  async deleteMyStrategyById() {}
  // (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
  async recoverStrategyById() {}
  // (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
  async noticeMyStrategyById() {}
  // (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
  async copyStrategy() {}
  // (POST) addLookupStrategy	id		(7) 투자 전략 조회자 추가  ( API )
  async addLookupStrategy() {}
}
