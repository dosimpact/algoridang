import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import {
  Category,
  CategoryList,
  Corporation,
  DailyStock,
} from './entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategoryList, Corporation, DailyStock]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [],
})
export class FinanceModule {}
