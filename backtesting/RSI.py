import backtrader as bt
from datetime import datetime

class RSI(bt.Strategy):
    param = [ 30 , 70 ]

    def __init__(self):
        self.rsi = bt.indicators.RSI_SMA(self.data.close, period=21)

    def next(self):
        if not self.position:
            if self.rsi < self.param[0]:
                close = self.data.close[0] # 종가 값 
                size = int(self.broker.getcash() / close)  # 최대 구매 가능 개수 
                
                self.buy(size=size)
        else:
            if self.rsi > self.param[1]:
                self.close() # 매