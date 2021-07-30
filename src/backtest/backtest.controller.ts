import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { Roles } from 'src/auth/auth.decorator';
import { HttpBodyCacheInterceptor } from 'src/common/service/HttpCacheInterceptor';
import { BacktestService } from './backtest.service';
import {
  AddHistoryInput,
  DeleteHistoryInput,
  UpdateHistoryInput,
} from './dto/mutation.dtos';

@UseInterceptors(HttpBodyCacheInterceptor)
@Controller('/api/backtest/')
export class BacktestQueryController {
  constructor(private readonly backtestService: BacktestService) {}
  @Get('getHistoryList/:strategy_code')
  async getHistoryList(@Param() strategy_code: number) {
    return this.backtestService.getHistoryList({ strategy_code });
  }
}

@Controller('/api/backtest/')
export class BacktestMutationController {
  constructor(private readonly backtestService: BacktestService) {}

  @Roles(['DAServer'])
  @Post('addHistory')
  async addHistory(@Body() addHistoryInput: AddHistoryInput) {
    return this.backtestService.addHistory(addHistoryInput);
  }

  @Roles(['DAServer'])
  @Post('deleteHistory')
  async deleteHistory(@Body() deleteHistoryInput: DeleteHistoryInput) {
    return this.backtestService.deleteHistory(deleteHistoryInput);
  }

  @Roles(['DAServer'])
  @Post('updateHistory')
  async updateHistory(@Body() updateHistoryInput: UpdateHistoryInput) {
    return this.backtestService.updateHistory(updateHistoryInput);
  }
}
