import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { Roles } from 'src/auth/auth.decorator';
import { HttpCacheInterceptor } from 'src/common/service/HttpCacheInterceptor';
import { BacktestService } from './backtest.service';
import {
  AddHistoryInput,
  DeleteHistoryInput,
  UpdateHistoryInput,
} from './dto/mutation.dtos';

@UseInterceptors(HttpCacheInterceptor)
@Controller('/api/backtest/')
export class BacktestQueryController {
  constructor(private readonly backtestService: BacktestService) {}

  // (1) 히스토리 조회
  @Get('getHistoryList/:strategy_code')
  async getHistoryList(@Param() strategy_code: number) {
    return this.backtestService.getHistoryList({ strategy_code });
  }
}

@Controller('/api/backtest/')
export class BacktestMutationController {
  constructor(private readonly backtestService: BacktestService) {}

  // (2) 히스토리 추가(Server)
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
