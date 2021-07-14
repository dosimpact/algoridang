#%%
import backtrader as bt
import pandas as pd
import matplotlib.pyplot as plt

import requests
import json
from pandas import json_normalize



class SmaCross(bt.SignalStrategy):
    def __init__(self):
        sma1, sma2 = bt.ind.SMA(period=10), bt.ind.SMA(period=30)
        crossover = bt.ind.CrossOver(sma1, sma2)
        self.signal_add(bt.SIGNAL_LONG, crossover)

        
# bt.Strategy를 구현 
class TestStrategy(bt.Strategy):
    def log(self, txt, dt=None):
        dt = dt or self.datas[0].datetime.date(0)
        print('%s, %s' % (dt.isoformat(), txt))
        
    def __init__(self):
        self.dataclose = self.datas[0].close
        self.order = None   # 미체결
        self.buyprice = None
        self.buycomm = None
        # 15 이평선 정의
        self.sma = bt.indicators.SimpleMovingAverage(self.datas[0], period = 15)
        # RSI 인덱스 정의
        self.rsi = bt.indicators.RelativeStrengthIndex()
        
    def notify_order(self, order):
        if order.status in [order.Submitted, order.Accepted]:
            return
        if order.status in [order.Completed]:
            if order.isbuy():
                self.log('BUY EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' % (order.executed.price,
                                                                              order.executed.value,
                                                                              order.executed.comm))
                self.buyprice = order.executed.price
                self.buycomm = order.executed.comm
            else :
                self.log('SELL EXECUTED, Price : %.2f, Cose: %.2f, Comm, %.2f' % (order.executed.price,
                                                                                 order.executed.value,
                                                                                 order.executed.comm))
            self.bar_executed = len(self)
        elif order.status in [order.Canceled, order.Margin, order.Rejected]:
            self.log('Order Canceled/ Margin/Rejected')
            
        self.order = None
    def notify_trade(self, trade):
        
        if not trade.isclosed:
            return
        
        self.log('OPERATION PROFIT, GROSS %.2f, NET %.2f' % (trade.pnl, trade.pnlcomm))
      
    # 매수, 매도, 유보 CASE 
    def next(self):
#         self.log('Close, %.2f' % self.dataclose[0])
#         print('rsi:',self.rsi[0])
        # 미체결 존재하면 return
        if self.order: 
            return
        # RSI 30 이하면  500주 매수 
        if not self.position: 
            if (self.rsi[0] < 30):
                self.log('BUY CREATE, %.2f'%self.dataclose[0])
                self.order = self.buy(size=500)
        # RSI 70 초과면 매도
        else:
            if (self.rsi[0] > 70):
                self.log('SELL CREATE, %.2f'%self.dataclose[0])
                self.order = self.sell(size=500)


dateparser = lambda x: pd.datetime.strptime(x, '%Y-%m-%d')

URL = 'http://133.186.229.72:4000/api/finance/dailystock/005930?take=3650' 
response = requests.get(URL)
data = json.loads(response.text)
df = json_normalize(data['dailyStocks']) #Results contain the required data

df["DATE"] = pd.to_datetime(df["DATE"], format='%Y-%m-%d')
df = df.set_index("DATE")
df = df.sort_values(by=['DATE'], axis=0, ascending=True)

df = df.loc[:, [
"OPEN",
"HIGH",
"LOW",
"CLOSE",
"TRADING_VOLUMN"]]

df.rename(columns={
    "OPEN":"Open"	,
    "HIGH":"High"	,
    "LOW":"Low",
    "CLOSE":'Close'	,
    "TRADING_VOLUMN":"Volume"
},inplace = True)
print (df)


################################################################



# QQQ( 미국ETF, 나스닥100 추종) 피트 주기
ticker = '삼성전자'
data = bt.feeds.PandasData(dataname = df) # df > bt 파싱

cerebro = bt.Cerebro() # 전략움직이는 객체를 할당
cerebro.addstrategy(TestStrategy)   # 전략 추가
cerebro.broker.setcommission(commission=0.001) # 거래수수료
cerebro.adddata(data,name=ticker) # 변환된 데이터 추가
cerebro.broker.setcash(10000000.0) # 보유 금액

print('Starting Portfolio Value: %.2f' % (cerebro.broker.getvalue()))
cerebro.run()
print('Final Portfolio Value : %.2f' % (cerebro.broker.getvalue()))
# cerebro.plot(volume=False, savefig=True, path=prefix_path+'backtrader-plot2.png')
cerebro.plot()[0][0]

# %%
