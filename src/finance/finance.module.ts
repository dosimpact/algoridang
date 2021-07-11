import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DAILY_STOCK } from './entities/daliy-stock.entity';
import { STOCK_CATEGORY } from './entities/stock-category';
import { STOCK_CATEGORY_LIST } from './entities/stock-category-list';
import { STOCK } from './entities/stock.entity';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      STOCK,
      STOCK_CATEGORY,
      STOCK_CATEGORY_LIST,
      DAILY_STOCK,
    ]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [],
})
export class FinanceModule {}
