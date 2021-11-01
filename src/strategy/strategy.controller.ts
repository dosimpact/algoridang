import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import { HttpCacheInterceptor } from 'src/common/interceptor/HttpCacheInterceptor';
import {
  CreateMyStrategyInput,
  DeleteMyStrategyByIdInput,
  ForkStrategyInput,
  UpdateMyStrategyByIdInput,
} from './dto/mutation.dtos';
import { MemberInfo } from 'src/member/entities';
import { TradingService } from 'src/trading/trading.service';
import { AddUniversalInput } from 'src/trading/dto/mutation.dtos';
import { InvestType } from './entities/member-strategy.entity';

@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/strategies/')
export class StrategyQueryController {
  constructor(private readonly strategyService: StrategyService) {}

  @Version('1')
  @Get('/')
  async getStrategies(
    @Query('type') type: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    if (type === 'new')
      return this.strategyService.getStrategyListNew({ take, skip });

    if (type === 'high-view')
      return this.strategyService.getStrategyListHighView({ skip, take });

    if (type === 'stable-income')
      return this.strategyService.getStrategyListInvestType({
        investType: InvestType.StableIncome,
        skip,
        take,
      });

    if (type === 'risk-taking')
      return this.strategyService.getStrategyListInvestType({
        investType: InvestType.RiskTaking,
        skip,
        take,
      });

    if (type === 'neutral')
      return this.strategyService.getStrategyListInvestType({
        investType: InvestType.Neutral,
        skip,
        take,
      });

    if (type === 'high-profit')
      return this.strategyService.getStrategyListHighProfit({ skip, take });

    return this.strategyService.getStrategyListNew({ skip, take });
  }
  // (GET) getStrategyListAllType(3) 위험추구/중립형/수익안정형 API
  @Version('1')
  @Get('invest-type')
  async getStrategyListAllType() {
    return this.strategyService.getStrategyListAllType({});
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
    return this.strategyService.getMyStrategyById(MemberInfo.email_id, {
      strategy_code,
    });
  }
  // (GET) getStrategyByTerm
  @Version('1')
  @Get('search/:term')
  async searchStrategy(
    @Param('term') term: string,
    @Query('type') type: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    type = type || 'name';

    if (type === 'name') {
      return this.strategyService.searchStrategyByName({ term, skip, take });
    } else if (type === 'ticker') {
      return this.strategyService.searchStrategyByTickerName({
        term,
        skip,
        take,
      });
    } else {
      return this.strategyService.searchStrategyByName({ term, skip, take });
    }
  }
  // (GET) getStrategyById	(4)특정 Id로 전략 조회
  @Version('1')
  @Get(':strategy_code')
  async getStrategyById(@Param('strategy_code') strategy_code) {
    return this.strategyService.getStrategyById({ strategy_code });
  }
}

@Controller('/api/strategies/')
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

  // (POST) createMyStrategy	(1) 나의 전략 만들기
  @Roles(['Any'])
  @Version('1')
  @Post('fork')
  async forkStrategy(
    @AuthUser() member: MemberInfo,
    @Body() forkStrategyInput: ForkStrategyInput,
  ) {
    return this.strategyService.forkStrategy(
      member.email_id,
      forkStrategyInput,
    );
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
  @Roles(['Any'])
  @Version('1')
  @Patch('my')
  async updateMyStrategyById(
    @AuthUser() m: MemberInfo,
    @Body() body: UpdateMyStrategyByIdInput,
  ) {
    return this.strategyService.updateMyStrategyById(m.email_id, body);
  }
  // (POST) deleteMyStrategyById	 	(3) 나의 전략 delete
  @Roles(['Any'])
  @Version('1')
  @Delete('my')
  async deleteMyStrategyById(
    @AuthUser() m: MemberInfo,
    @Body() body: DeleteMyStrategyByIdInput,
  ) {
    return this.strategyService.softDeleteMyStrategyById(m.email_id, body);
  }
  // TODO 🚀 (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
  // async recoverStrategyById() {}
  // TODO 🚀 (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
  // async noticeMyStrategyById() {}
  // TODO 🚀 (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
  // async copyStrategy() {}
  // TODO 🚀 (POST) addLookupStrategy	id		(7) 투자 전략 조회자 추가  ( API )
  // async addLookupStrategy() {}
}
