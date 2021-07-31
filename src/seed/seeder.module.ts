import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  History,
  InvestProfitInfo,
} from 'src/backtest/entities';
import {
  Category,
  CategoryList,
  Corporation,
  DailyStock,
} from 'src/finance/entities';
import {
  LookupMemberList,
  MemberInfo,
  OperationMemberList,
} from 'src/member/entities';
import { Hash, HashList, MemberStrategy } from 'src/strategy/entities';
import {
  BaseTradingStrategy,
  SimpleBacktest,
  Universal,
} from 'src/trading/entities';
import { UploadedObject } from 'src/upload/entities/uploaded-object.entity';
import { SeederService } from './seeder.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        MAINTAINER: Joi.string().required(),
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        DATABASE_rejectUnauthorized: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ...(process.env.DATABASE_rejectUnauthorized === 'false' && {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      synchronize: false,
      logging: false,
      entities: [
        ...[
          // finance (4/4)
          CategoryList,
          Category,
          Corporation,
          DailyStock,
        ],
        ...[
          // Trading(4/4)
          BaseTradingStrategy,
          SimpleBacktest,
          Universal,
        ],
        ...[
          //
          Hash,
          HashList,
          MemberStrategy,
          // StockList,
        ],
        ...[
          // back test (7/7)
          AccumulateProfitRateChart,
          BacktestDetailInfo,
          BacktestMontlyProfitRateChart,
          BacktestQueue,
          BacktestWinRatio,
          History,
          InvestProfitInfo,
        ],
        ...[
          //member (3/3)
          LookupMemberList,
          MemberInfo,
          OperationMemberList,
        ],
        ...[
          //upload
          UploadedObject,
        ],
      ],
    }),
    TypeOrmModule.forFeature([
      ...[
        // finance (4/4)
        CategoryList,
        Category,
        Corporation,
        DailyStock,
      ],
      ...[
        // Trading(4/4)
        BaseTradingStrategy,
        SimpleBacktest,
        Universal,
      ],
      ...[
        //
        Hash,
        HashList,
        MemberStrategy,
        // StockList,
      ],
      ...[
        // back test (7/7)
        AccumulateProfitRateChart,
        BacktestDetailInfo,
        BacktestMontlyProfitRateChart,
        BacktestQueue,
        BacktestWinRatio,
        History,
        InvestProfitInfo,
      ],
      ...[
        //member (3/3)
        LookupMemberList,
        MemberInfo,
        OperationMemberList,
      ],
      ...[
        //upload
        UploadedObject,
      ],
    ]),
  ],
  controllers: [],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
