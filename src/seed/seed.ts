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
  if (getCorporations.corporations) {
    getCorporations.corporations.map(async (corp) => {
      const { ticker, corp_name } = corp;
      console.log(ticker, corp_name);
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
          strategy_explanation: `기본 골든 크로스 전략 입니다.(${corp_name},${ticker}) 5,18 이평선을 활용한 매매 전략입니다.`,
          strategy_name: `${corp_name} 6,16 골든 크로스 전략`,
          open_yes_no: true,
          tags: ['기본전략', '골든크로스'],
        },
      );
      // 유니버셜 추가
      await tradingService.addUniversal('ypd03008@gmail.com', {
        strategy_code: newStrategy.memberStrategy.strategy_code,
        ticker,
        trading_strategy_name: StrategyName.GoldenCross,
        setting_json: { GoldenCross: { pfast: 16, pslow: 6 } },
        start_date: '2011-08-19T06:58:48.421Z',
      });
      // 백테스팅 요청
      await flaskService.pushBackTestQ('ypd03008@gmail.com', {
        strategy_code: newStrategy.memberStrategy.strategy_code,
      });
    });
  }
}
bootstrap();
