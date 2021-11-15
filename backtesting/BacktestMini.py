from backtesting.Backtest import Backtest

from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI
from backtesting.Strategies.BollingerBand import BollingerBand
from backtesting.Strategies.MACD import MACD 

from DB.RedisConnectionPool import RedisConnectionPool

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
        
    def getMiniBacktest3YearData(self, ticker, salestrategy):
        """mini backtest 수행시 3년치 데이터를 적용하여 결과 데이터 생성함수
        @params 
            ticker - 티커값
            salestrategy - 전략명
        
        @return 
            {
                'code' : 'Success',
                'res' : {
                    'mdd' : 0.0,
                    'cagr' : 0
                }
            }

        """
        if salestrategy == 'GoldenCross':
            salestrategy = SMACross
            minDate = 20

        if salestrategy == 'RSI':
            salestrategy = RSI
            minDate = 21

        if salestrategy == 'BollingerBand':
            salestrategy = BollingerBand
            minDate = 20

        if salestrategy == 'MACD':
            salestrategy = MACD
            minDate = 40

        result, start = self.backtest(ticker, 100000000, salestrategy, '20190101', None, minDate)
        self.makebacktestResult(start)
        self.makePortpolio()

        self.res['code'] = 'Success'
        self.res['res']['profit_rate'] = result / 100000000
        if self.metrics.loc['Max Drawdown ']['Strategy'] == '':
            self.res['res']['mdd'] = 0.0
        else:
            self.res['res']['mdd'] = self.metrics.loc['Max Drawdown ']['Strategy']
        self.res['res']['year_avg_profit_rate'] = self.metrics.loc['CAGR%']['Strategy']
        return self.res


    def getMiniBacktest(self, miniBackData):
        if miniBackData.get('ticker') is None or\
            miniBackData.get('salestrategy') is None or\
            miniBackData.get('setting') is None or\
            miniBackData.get('data') is None:
            return self.res
        
        cacheDataFrom = self.isCacheDataFromatCheck(miniBackData)

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
            
        if cacheDataFrom == True: 
            cacheData = self.isCacheHit(ticker,  miniBackData['salestrategy'])
            if cacheData is not None : 
                return cacheData

        result, start = self.backtest(ticker, 100000000, salestrategy, data['startTime'], data['endTime'], minDate)
        self.makebacktestResult(start)
        self.makePortpolio()

        self.res['code'] = 'Success'
        self.res['res']['profit_rate'] = result / 100000000
        if self.metrics.loc['Max Drawdown ']['Strategy'] == '':
            self.res['res']['mdd'] = 0.0
        else:
            self.res['res']['mdd'] = self.metrics.loc['Max Drawdown ']['Strategy']
        self.res['res']['year_avg_profit_rate'] = self.metrics.loc['CAGR%']['Strategy']
        return self.res

    def isCacheHit(self, ticker, salestrategy):
        rdb = RedisConnectionPool()
        res = rdb.getRedisData(ticker)
        if res is None:
            return None
        return res[salestrategy]
        

    def isCacheDataFromatCheck(self, dataFromat):
        salestrategy = dataFromat['salestrategy']
        setting = dataFromat['setting']
        data = dataFromat['data']
        
        #todo 디자인 패턴 적용 필요 
        if salestrategy == 'GoldenCross' and setting[0] == 5 and setting[1] == 20 and data['startTime'] == '20190101':
            return True

        if salestrategy == 'RSI' and setting[0] == 30 and setting[1] == 70 and data['startTime'] == '20190101':
            return True

        if salestrategy == 'BollingerBand' and setting[0] == 20 and data['startTime'] == '20190101':
            return True

        if salestrategy == 'MACD' and setting[0] == 12 and setting[1] == 26 and setting[2] == 9 and data['startTime'] == '20190101':
            return True

        return False