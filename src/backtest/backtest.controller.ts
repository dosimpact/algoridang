import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
  Body,
  Version,
} from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import { HttpCacheInterceptor } from 'src/common/service/HttpCacheInterceptor';
import { MemberInfo } from 'src/member/entities';
import { BacktestService } from './backtest.service';
import {
  AddHistoryInput,
  DeleteHistoryInput,
  PushBackTestQInput,
  UpdateHistoryInput,
} from './dto/mutation.dtos';
import { FlaskService } from './flask.service';

@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/backtests/')
export class BacktestQueryController {
  constructor(private readonly backtestService: BacktestService) {}

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

  // (2) 히스토리 추가(Server)
  @Version('1')
  @Roles(['DAServer'])
  @Post('addHistory')
  async addHistory(@Body() addHistoryInput: AddHistoryInput) {
    return this.backtestService.addHistory(addHistoryInput);
  }

  // (3) 히스토리 삭제(Server)
  @Roles(['DAServer'])
  @Post('deleteHistory')
  async deleteHistory(@Body() deleteHistoryInput: DeleteHistoryInput) {
    return this.backtestService.deleteHistory(deleteHistoryInput);
  }

  // (4) 히스토리 업데이트(Server)
  @Roles(['DAServer'])
  @Post('updateHistory')
  async updateHistory(@Body() updateHistoryInput: UpdateHistoryInput) {
    return this.backtestService.updateHistory(updateHistoryInput);
  }
}
