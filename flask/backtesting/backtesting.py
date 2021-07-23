from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import json
import requests
import pandas as pd
import backtrader as bt
from pandas import json_normalize


from openAPI.DB import DB


class SMACross(bt.Strategy):
    params = dict( 
        pfast=5, # period for the fast moving average 
        pslow=20 # period for the slow moving average 
    )
    def __init__(self):
        sma1 = bt.ind.SMA(period=self.p.pfast) # fast moving average 
        sma2 = bt.ind.SMA(period=self.p.pslow) # slow moving average 
        self.crossover = bt.ind.CrossOver(sma1, sma2) # crossover signal 
        self.holding = 0
    def next(self): 
        if not self.position: # not in the market 
            if self.crossover > 0: # if fast crosses slow to the upside 
                close = self.data.close[0] # 종가 값 
                size = int(self.broker.getcash() / close)  # 최대 구매 가능 개수 
                self.buy(size=size) # 매수 size = 구매 개수 설정 
                
                dt = self.datas[0].datetime.date(0)
                print('%s' % (dt.isoformat()),"buy : ",self.data.close[0])
        elif self.crossover < 0: # in the market & cross to the downside 
            
            dt = self.datas[0].datetime.date(0)
            print('%s' % (dt.isoformat()),"sell : ",self.data.close[0])
            self.close() # 매도
        #print(self.data.close[0])
    
    def notify_order(self, order):
        if order.status not in [order.Completed]:
            return
        ftest = 0
        if order.isbuy():
            action = 'Buy'
            ftest=1
        elif order.issell():
            action = 'Sell'
            ftest=2
        stock_price = self.data.close[0]
        cash = self.broker.getcash()
        value = self.broker.getvalue()
        self.holding += order.size
        """
        if ftest == 1:
            print("buy : ",stock_price)
        if ftest == 2:
            print("sell : ",stock_price)
        """
        print('%s[%d] holding[%d] price[%d] cash[%.2f] value[%.2f]'
              % (action, abs(order.size), self.holding, stock_price, cash, value))




class CBackTtrader(object):
    def __init__(self) -> None:
        super().__init__()

   


    def getDBData(self,ticker, start, end = None):
        DBClass = DB.psql()
        querySelect = " stock_date, open_price, high_price, low_price, close_price, volume"
        queryWhere = "\"ticker\" = \'"+ticker+"\' order by stock_date asc;"
        df = DBClass.getDataFrameSelectQuery(querySelect,"daily_stock",queryWhere)
       
        df["stock_date"] = pd.to_datetime(df["stock_date"], format='%Y-%m-%d')
        df = df.set_index("stock_date")
        df = df.sort_values(by=['stock_date'], axis=0, ascending=True)

        df.rename(columns={
            "open_price":"Open"	,
            "high_price":"High"	,
            "low_price":"Low",
            "close_price":'Close'	,
            "volume":"Volume"
        },inplace = True)

        res = []
        if end == None or end == '':
            res = df[str(pd.to_datetime(start, format='%Y-%m-%d')) : ]
        else:
            res = df[str(pd.to_datetime(start, format='%Y-%m-%d')) :str(pd.to_datetime(end, format='%Y-%m-%d')) ]

        return res


    def startbackTest(self,tickerList, cash, startTime, endTime= None):
        if type(tickerList) is list:   
            ticker = tickerList[0]
        else :
            ticker = tickerList


        cerebro = bt.Cerebro()
        #cash setting
        cerebro.broker.setcash(int(cash))
        dateparser = lambda x: pd.datetime.strptime(x, '%Y-%m-%d')

        cerebro.broker.set_coc(True)
        # Add a strategy
        cerebro.addstrategy(SMACross)

        #pandas data inpute
        cerebro.adddata(bt.feeds.PandasData(dataname = self.getDBData(ticker,startTime,endTime)),name=ticker)
        
        #run strategy
        print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())
        cerebro.run()
        print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())
        cerebro.plot()

        return cerebro.broker.getvalue()


if __name__ == "__main__":
    backtest = CBackTtrader()
    tickerList = ["005930"]
    res = backtest.startbackTest(tickerList, 10000000,"20110101",)
    print(res)