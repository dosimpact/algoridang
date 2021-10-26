import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
  Body,
  Version,
  CacheTTL,
  Header,
} from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import {
  HttpBodyCacheInterceptor,
  HttpCacheInterceptor,
} from 'src/common/interceptor/HttpCacheInterceptor';
import { MemberInfo } from 'src/member/entities';
import { BacktestService } from './backtest.service';
import {
  AddHistoryInput,
  DeleteHistoryInput,
  PushBackTestQInput,
  UpdateHistoryInput,
} from './dto/mutation.dtos';
import { RequestMiniBacktestingInput } from './dto/query.dtos';
import { FlaskService } from './flask.service';

@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/backtests/')
export class BacktestQueryController {
  constructor(
    private readonly backtestService: BacktestService,
    private readonly flaskService: FlaskService,
  ) {}

  @Roles(['Any'])
  @Version('1')
  @Get(':strategy_code/histories')
  async getHistories(@Param() strategy_code: string) {
    return this.backtestService.getHistoryList({ strategy_code });
  }

  @Roles(['Any'])
  @Version('1')
  @Get(':strategy_code/accumulate-profit-rate')
  async getAccumulateProfitRate(@Param() strategy_code: string) {
    return this.backtestService.getAccumulateProfitRateChartList({
      strategy_code,
    });
  }

  @Roles(['Any'])
  @Version('1')
  @Get(':strategy_code/montly-profit-rate')
  async getMontlyProfitRate(@Param() strategy_code: string) {
    return this.backtestService.getMontlyProfitRateChartList({ strategy_code });
  }

  @Roles(['Any'])
  @Version('1')
  @Get(':strategy_code/daily-profit-rate')
  async getDailyProfitRate(@Param() strategy_code: string) {
    return this.backtestService.getDailyProfitRateChartList({ strategy_code });
  }

  @Roles(['Any'])
  @Version('1')
  @Get(':strategy_code/win-ratio')
  async getWinRatio(@Param() strategy_code: string) {
    return this.backtestService.getBacktestWinRatio({ strategy_code });
  }

  @Version('1')
  @Header('content-type', 'text/html')
  @Get(':strategy_code/quantstates-report')
  async getQuantstatesReport(@Param() strategy_code: string) {
    return this.backtestService.getQuantstatesReport({ strategy_code });
  }
}

@Controller('/api/backtests/')
export class BacktestMutationController {
  constructor(
    private readonly backtestService: BacktestService,
    private readonly flaskService: FlaskService,
  ) {}

  // (1) 전략 백테스트 요청
  @Version('1')
  @Roles(['Any'])
  @Post('backtest-q')
  async pushBackTestQ(
    @AuthUser() MemberInfo,
    @Body() body: PushBackTestQInput,
  ) {
    return this.flaskService.pushBackTestQ(MemberInfo.email_id, body);
  }

  // deprecated () 히스토리 추가(Server)
  @Version('1')
  @Roles(['DAServer'])
  @Post('addHistory')
  async addHistory(@Body() addHistoryInput: AddHistoryInput) {
    return this.backtestService.addHistory(addHistoryInput);
  }

  // deprecated () 히스토리 삭제(Server)
  @Roles(['DAServer'])
  @Post('deleteHistory')
  async deleteHistory(@Body() deleteHistoryInput: DeleteHistoryInput) {
    return this.backtestService.deleteHistory(deleteHistoryInput);
  }

  // deprecated () 히스토리 업데이트(Server)
  @Roles(['DAServer'])
  @Post('updateHistory')
  async updateHistory(@Body() updateHistoryInput: UpdateHistoryInput) {
    return this.backtestService.updateHistory(updateHistoryInput);
  }

  // (2) 미니 백테스트 요청
  @Version('1')
  @Roles(['Any'])
  @Post('mini-backtest')
  @CacheTTL(60 * 60 * 24)
  @UseInterceptors(HttpBodyCacheInterceptor)
  async requestMiniBackTest(@Body() body: RequestMiniBacktestingInput) {
    return this.flaskService.__requestMiniBacktesting(body);
  }
}
