import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { BacktestService } from 'src/backtest/backtest.service';
import { FlaskService } from 'src/backtest/flask.service';
import { FinanceService } from 'src/finance/finance.service';
import { StrategyService } from 'src/strategy/strategy.service';
import { StrategyName } from 'src/trading/constant/strategy-setting';
import { TradingService } from 'src/trading/trading.service';

async function bootstrap() {
  // const appContext = await NestFactory.createApplicationContext(SeederModule);
  // const seederService = appContext.get(SeederService);
  // await seederService.seedBaseTradingStrategy();
  // await seederService.seedScenario01();
  const entryAppContent = await NestFactory.createApplicationContext(AppModule);
  const financeService = entryAppContent.get(FinanceService);
  const strategyService = entryAppContent.get(StrategyService);
  const tradingService = entryAppContent.get(TradingService);
  const flaskService = entryAppContent.get(FlaskService);

  const getCorporations = await financeService.getCorporations();

  const strategyTC_01 = () => {
    if (getCorporations.corporations) {
      getCorporations.corporations.slice(101, 102).map(async (corp) => {
        const { ticker, corp_name } = corp;
        console.log('start...', ticker, corp_name);
        // 전략 만들기
        const newStrategy = await strategyService.createMyStrategy(
          'ypd03008@gmail.com',
          {
            investProfitInfo: {
              securities_corp_fee: '0.05',
              invest_start_date: '2011-08-19T06:58:48.421Z',
              invest_end_date: '2021-08-19T06:58:48.421Z',
              invest_principal: '30000000',
            },
            strategy_explanation: `기본 골든 크로스 전략 입니다.(${corp_name},${ticker}) TC-1`,
            strategy_name: `TestCase01 ${corp_name} 5,15 골든 크로스 전략`,
            open_yes_no: true,
            tags: ['기본전략', '골든크로스'],
          },
        );
        // 유니버셜 추가
        await tradingService.addUniversal('ypd03008@gmail.com', {
          strategy_code: newStrategy.memberStrategy.strategy_code,
          ticker,
          trading_strategy_name: StrategyName.GoldenCross,
          setting_json: { GoldenCross: { pfast: 5, pslow: 20 } },
        });
        // 백테스팅 요청
        await flaskService.pushBackTestQ('ypd03008@gmail.com', {
          strategy_code: newStrategy.memberStrategy.strategy_code,
        });
        console.log('✔', ticker, corp_name);
      });
    }
    console.log('✔ done strategy TC_01');
  };

  const strategyTC_02 = async () => {
    // 전략 만들기
    const newStrategy = await strategyService.createMyStrategy(
      'ypd03008@gmail.com',
      {
        investProfitInfo: {
          securities_corp_fee: '0.05',
          invest_start_date: '2011-08-19T06:58:48.421Z',
          invest_end_date: '2021-08-19T06:58:48.421Z',
          invest_principal: '30000000',
        },
        strategy_explanation: `기본 골든 크로스 전략 입니다 TC-2`,
        strategy_name: `TestCase02 5,15 골든 크로스 전략*2`,
        open_yes_no: true,
        tags: ['기본전략', '골든크로스'],
      },
    );
    if (getCorporations.corporations) {
      getCorporations.corporations.slice(101, 103).map(async (corp) => {
        const { ticker, corp_name } = corp;
        // 유니버셜 추가
        await tradingService.addUniversal('ypd03008@gmail.com', {
          strategy_code: newStrategy.memberStrategy.strategy_code,
          ticker,
          trading_strategy_name: StrategyName.GoldenCross,
          setting_json: { GoldenCross: { pfast: 5, pslow: 20 } },
        });
        // 백테스팅 요청
        console.log('✔', ticker, corp_name);
      });
    }
    await flaskService.pushBackTestQ('ypd03008@gmail.com', {
      strategy_code: newStrategy.memberStrategy.strategy_code,
    });
    console.log('✔ done strategy TC_02');
  };

  const strategyTC_03 = async () => {
    // 전략 만들기
    const newStrategy = await strategyService.createMyStrategy(
      'ypd03008@gmail.com',
      {
        investProfitInfo: {
          securities_corp_fee: '0.05',
          invest_start_date: '2011-08-19T06:58:48.421Z',
          invest_end_date: '2021-08-19T06:58:48.421Z',
          invest_principal: '30000000',
        },
        strategy_explanation: `기본 골든 크로스 전략 입니다 TC-3`,
        strategy_name: `TestCase03 5,15 골든크로스&RSI 전략`,
        open_yes_no: true,
        tags: ['기본전략', '골든크로스'],
      },
    );
    if (getCorporations.corporations) {
      await Promise.all([
        ...getCorporations.corporations.slice(104, 105).map(async (corp) => {
          const { ticker, corp_name } = corp;
          // 유니버셜 추가
          await tradingService.addUniversal('ypd03008@gmail.com', {
            strategy_code: newStrategy.memberStrategy.strategy_code,
            ticker,
            trading_strategy_name: StrategyName.GoldenCross,
            setting_json: { GoldenCross: { pfast: 5, pslow: 20 } },
          });
          console.log('✔', ticker, corp_name);
        }),
        ...getCorporations.corporations.slice(105, 106).map(async (corp) => {
          const { ticker, corp_name } = corp;
          // 유니버셜 추가
          await tradingService.addUniversal('ypd03008@gmail.com', {
            strategy_code: newStrategy.memberStrategy.strategy_code,
            ticker,
            trading_strategy_name: StrategyName.RSI,
            setting_json: { RSI: { min: 30, max: 70 } },
          });
          console.log('✔', ticker, corp_name);
        }),
      ]);
    }
    //
    console.log('✔ pushBackTestQ', newStrategy.memberStrategy.strategy_code);
    await flaskService.pushBackTestQ('ypd03008@gmail.com', {
      strategy_code: newStrategy.memberStrategy.strategy_code,
    });
    console.log('✔ done strategy TC_03');
  };

  const seedBaseTradingStrategy = async () => {
    tradingService.__seedBaseTradingStrategy();
  };

  const main = () => {
    // 매매전략 시드
    // strategyTC_01();
    // strategyTC_02();
    // strategyTC_03();
    // 기술적분석, 기본값 시드
    seedBaseTradingStrategy();
  };
  main();
}
bootstrap();
