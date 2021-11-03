from backtesting.Backtest import Backtest

from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI
from backtesting.Strategies.BollingerBand import BollingerBand
from backtesting.Strategies.MACD import MACD 

class BacktestMini(Backtest):
    def __init__(self) -> None:
        super().__init__()
    
        self.res = {
            'code' : 'Error',
            'res' : {
                'profit_rate' : 0,
                'year_avg_profit_rate' : 0,
                'mdd' : 0
            }
        }

    def getMiniBacktest(self, miniBackData):
        if miniBackData.get('ticker') is None or\
            miniBackData.get('salestrategy') is None or\
            miniBackData.get('setting') is None or\
            miniBackData.get('data') is None:
            return self.res
        
        ticker = miniBackData['ticker']
        salestrategy = miniBackData['salestrategy']
        setting = miniBackData['setting']
        data = miniBackData['data']
        
        #todo 디자인 패턴 적용 필요 
        if salestrategy == 'GoldenCross':
            salestrategy = SMACross
            minDate = setting[1]

        if salestrategy == 'RSI':
            salestrategy = RSI
            minDate = 21

        if salestrategy == 'BollingerBand':
            salestrategy = BollingerBand
            minDate = miniBackData['setting'][0]+1

        if salestrategy == 'MACD':
            salestrategy = MACD
            minDate = miniBackData['setting'][1]
            if minDate < 40:
                minDate = 40

        for i in range(len(salestrategy.param)):
            salestrategy.param[i] = setting[i]         
            

        res, start = self.backtest(ticker, 10000000, salestrategy, data['startTime'], data['endTime'], minDate)
        self.makebacktestResult(start)
        self.makePortpolio()


        self.res['code'] = 'Success'
        self.res['res']['profit_rate'] = res / 100000000
        if self.metrics.loc['Max Drawdown ']['Strategy'] == '':
            self.res['res']['mdd'] = 0.0
        else:
            self.res['res']['mdd'] = self.metrics.loc['Max Drawdown ']['Strategy']
        self.res['res']['year_avg_profit_rate'] = self.metrics.loc['CAGR%']['Strategy']
        return self.res