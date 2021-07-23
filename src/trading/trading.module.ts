import { Module } from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradingController } from './trading.controller';
import { TradingResolver } from './trading.resolver';

@Module({
  controllers: [TradingController],
  providers: [TradingService, TradingResolver]
})
export class TradingModule {}
