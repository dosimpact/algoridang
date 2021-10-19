import backtrader as bt

class SMACross(bt.Strategy):
    param = [ 5 , 20 ]
    def __init__(self):
        sma1 = bt.ind.SMA(period=self.param[0]) # fast moving average 
        sma2 = bt.ind.SMA(period=self.param[1]) # slow moving average 
        self.crossover = bt.ind.CrossOver(sma1, sma2) # crossover signal 
        self.holding = 0

  
    def next(self): 
        if not self.position: # not in the market 
            if self.crossover > 0: # if fast crosses slow to the upside 
                close = self.data.close[0] # 종가 값 
                size = int(self.broker.getcash() / close)  # 최대 구매 가능 개수 
                self.buy(size=size) # 매수 size = 구매 개수 설정 
                
                dt = self.datas[0].datetime.date(0)
                #print('%s' % (dt.isoformat()),"buy : ",self.data.close[0])
        elif self.crossover < 0: # in the market & cross to the downside 
            
            dt = self.datas[0].datetime.date(0)
            #print('%s' % (dt.isoformat()),"sell : ",self.data.close[0])
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
        #print('%s[%d] holding[%d] price[%d] cash[%.2f] value[%.2f]'
        #      % (action, abs(order.size), self.holding, stock_price, cash, value))

