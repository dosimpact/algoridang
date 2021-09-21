
from backtesting.MiniBacktest import MiniBacktest 

import backtrader as bt
import quantstats
from backtesting.SMACross import SMACross
from openAPI.DB.connectionPool import databasepool
import pandas as pd

class MakeMiniBackTest(MiniBacktest):
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



    def minibacktest(self, miniBackData):

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

        return self.miniTickerBackTest(data, ticker, salestrategy, setting, minDate)


    def miniTickerBackTest(self, data, ticker, salestrategy, setting, minDate):
        cerebro = bt.Cerebro()
        
        cerebro.addanalyzer(bt.analyzers.PyFolio, _name='PyFolio')
        
        # 구매 신청시 무조건 최대 금액으로 살 수 있음.
        cerebro.broker.set_coc(True)
        cerebro.params.tradehistory = True

        for i in range(len(salestrategy.param)):
            salestrategy.param[i] = setting[i]                
        cerebro.addstrategy(salestrategy)
                
        cerebro.broker.setcash(int(100000000))
        
        tickerDateData, state = self._getDBData(ticker, minDate, data['startTime'], data['endTime'])

        if state != 1:
            return self.res

        cerebro.adddata(bt.feeds.PandasData(dataname=tickerDateData), name=ticker)


        results = cerebro.run()

        strat = results[0]
        

        # 일간 수익률 
        portfolio_stats = strat.analyzers.getbyname('PyFolio')
        returns, positions, transactions, gross_lev = portfolio_stats.get_pf_items()
        returns.index = returns.index.tz_convert(None)

        metrics = quantstats.reports.metrics(returns, mode='full', display=False)


        self.res['code'] = 'Success'
        self.res['res']['profit_rate'] = cerebro.broker.getvalue() / 100000000
        self.res['res']['mdd'] = metrics.loc['Max Drawdown ']['Strategy']
        self.res['res']['year_avg_profit_rate'] = metrics.loc['CAGR%']['Strategy']

        return self.res

    def _getDBData(self, ticker, mindatalen, start, end=None):
        res = []
        DBClass = databasepool()
        conn = DBClass.getConn()
        query = "select stock_date, open_price, high_price, low_price, close_price, volume from daily_stock"
        query += " where \"ticker\" = \'"+ticker+"\' order by stock_date asc;"
        
        try:
            df = DBClass.selectDataframe(conn, query)
            DBClass.putConn(conn)
        except:
            DBClass.putConn(conn)
            return res, -1

        df["stock_date"] = pd.to_datetime(df["stock_date"], format='%Y-%m-%d')
        df = df.set_index("stock_date")
        df = df.sort_values(by=['stock_date'], axis=0, ascending=True)

        df.rename(columns={
            "open_price":"Open"	,
            "high_price":"High"	,
            "low_price":"Low",
            "close_price":'Close'	,
            "volume":"Volume"
        },inplace=True)
        
        
        alllen = len(df)
        backtestlen = len(df[str(pd.to_datetime(start, format='%Y-%m-%d')):])
        getDataPosStr = alllen - backtestlen - mindatalen
        if getDataPosStr > 0:
            if end is None or end == '':
                res = df[getDataPosStr:]
            else:
                getDataPosEnd = len(df[:str(pd.to_datetime(end, format='%Y-%m-%d'))])
                res = df[getDataPosStr:getDataPosEnd]
        else:
            res = df

        if len(res) < mindatalen:
            return res, 0
        return res, 1