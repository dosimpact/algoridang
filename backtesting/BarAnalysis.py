import backtrader as bt
class BarAnalysis(bt.analyzers.Analyzer):
    ticker = ""
    rets = {}
    winCnt = 0
    loseCnt = 0
    tradehistory = []
    def start(self):
        self.rets['data']  = {}
        
    def next(self):
        try:
            if not self.rets['data'].get(str(self.datas[0].datetime.datetime())) :
                self.rets['data'][str(self.datas[0].datetime.datetime())]  = []
            
            self.rets['data'][str(self.datas[0].datetime.datetime())].append(
                    [
                        #self.datas[0].datetime.datetime(),
                        self.ticker,
                        self.datas[0].open[0],
                        self.datas[0].high[0],
                        self.datas[0].low[0],
                        self.datas[0].close[0],
                        self.datas[0].volume[0],
                        self.strategy.getposition().size,
                        self.strategy.broker.getvalue(),  # 주식 + 현금
                        self.strategy.broker.getcash(),  # 현금
                    ]
                )
        except:
            pass

    def get_analysis(self):
        return self.rets


    def get_winloseCnt(self):
        return self.winCnt,self.loseCnt


    def get_tradehistory(self):
        return self.tradehistory


    def init_tradehistory(self):
        while len(self.tradehistory) != 0:
            self.tradehistory.pop()
        self.winCnt = 0
        self.loseCnt = 0

    def notify_trade(self, trade):
        date = self.data.datetime.datetime()
        
        if trade.isopen:
            self.tradehistory.append([str(date),trade.price,None,self.ticker])
            """
            print('-'*32,' OPEN NOTIFY TRADE ','-'*32)
            print('{}, Price: {}'.format(date,trade.price))
            """
                                                


        if trade.isclosed:
            #히스토리 생성기
            self.tradehistory.append([str(date),self.datas[0].close[0],round(self.datas[0].close[0]/trade.price*100-100,2),self.ticker])

            """
            print('-'*32,' CLOSE NOTIFY TRADE ','-'*32)
            print('{}, Price: {}, Profit, Gross {}, Net {}'.format(
                                                date,
                                                trade.price,
                                                round(trade.pnl,2),
                                                round(trade.pnlcomm,2)))
                                                """
            # 승수 계산기
            if round(trade.pnl,2) > 0:
                self.winCnt += 1
            else:
                self.loseCnt += 1
                
