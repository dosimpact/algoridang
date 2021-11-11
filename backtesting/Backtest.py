
from datetime import datetime
import backtrader as bt
import quantstats
import pandas as pd
import sys
import copy

from datetime import date, timedelta
from DB.connectionPool import databasepool

from backtesting.BarAnalysis import BarAnalysis

class Backtest(object):
    """ 백테스트 수행 클래스

    Main methods :
        backtest - backtest 수행
        
    """

    def __init__(self) -> None:
        """ Initializer """
        super().__init__()

        self.totalreturn = None
        self.win = None
        self.lose = None
        self.tradehitory = None
        self.metrics = None
        self.dailyData = None
        

    def _getDBData(self, ticker, mindatalen, start, end=None):
        """DB에서 쿼리를 가져오는 함수
        
        @parms 
            ticker - ticker 정보 string
            mindatalen - 가장 적은수치라도 가져와야하는 데이터
            start - 시작일
            end - 종료일
                None - 오늘까지
        
        @return 
            res - 결과 데이터 프레임
            state - 정상 동작, pass 동작 구분
        """

        startDay = date(int(start[0:4]),int(start[4:6]),int(start[6:]))
        startDay = startDay - timedelta(mindatalen + 1)
        startDay = str(startDay.strftime("%Y%m%d"))


        res = []
        DBClass = databasepool()
        conn = DBClass.getConn()
        query = "select stock_date, open_price, high_price, low_price, close_price, volume from daily_stock"
        query += " where \"ticker\" = \'"+ticker+"\' and  stock_date  >= \'" + startDay +"\' order by stock_date asc;"
        
        try:
            df = DBClass.selectDataframe(conn, query)
            DBClass.putConn(conn)
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
            getDataPosStr = alllen - mindatalen - 1
            if getDataPosStr > 0:
                if end is None or end == '':
                    res = df[:]
                else:
                    getDataPosEnd = len(df[:str(pd.to_datetime(end, format='%Y-%m-%d'))])
                    res = df[:getDataPosEnd]
            else :
                self.error = "DataCondition Error  function(_getDBData)" + str(ticker)
                return res, "pass"    

            return res, "work"
        except:
            self._setStatusMemberStrategy( "Error", "_getDBData Unexpected error", self.strategyCode)
            print("_getDBData Unexpected error:", sys.exc_info()[0]) 
            return res, "error"


    def backtest(self, ticker, cash, salestrategy, startTime, endTime, minDate, plot = None):
        """ baskctest function """
        cerebro = bt.Cerebro()
        BarAnalysis.ticker = ticker
        cerebro.addanalyzer(BarAnalysis, _name="bar_data")
        
        cerebro.addanalyzer(bt.analyzers.PyFolio, _name='PyFolio')
        
        # 구매 신청시 무조건 최대 금액으로 살 수 있음.
        cerebro.broker.set_coc(True)
        cerebro.params.tradehistory = True
             
        cerebro.addstrategy(salestrategy)
                
        cerebro.broker.setcash(int(cash))
        tickerDateData, state = self._getDBData(ticker, minDate, startTime, endTime)
        if state == 'pass':
            print("["+str(ticker)+"] work Passed")
            del cerebro
            return cash, None

        cerebro.adddata(bt.feeds.PandasData(dataname=tickerDateData), name=ticker)

        results = cerebro.run()

        strat = results[0]
        print(strat)
        value = cerebro.broker.getvalue()

        # 그래프 그리기
        if plot is not None:
            cerebro.plot()

        
        del cerebro
        return value, strat


    def makePortpolio(self):
        """ 단일종목 포트폴리오 """
        if self.totalreturn == None:
            return 
        self.metrics = quantstats.reports.metrics(self.totalreturn, mode='full', display=False)
    
#################################################################################################
    def makebacktestResult(self, strat):
        if strat == None:
            return 

        # 일간 데이터
        self.daily_profit(strat)
        
        # 일간 수익률 
        portfolio_stats = strat.analyzers.getbyname('PyFolio')
        returns, positions, transactions, gross_lev = portfolio_stats.get_pf_items()
        returns.index = returns.index.tz_convert(None)

        self.totalreturn = returns
         
        # 승수 출력
        winCnt, loseCnt = strat.analyzers.bar_data.get_winloseCnt()
        self.win = winCnt
        self.lose = loseCnt

        # 히스토리 출력하기
        self.tradehitory = copy.deepcopy(strat.analyzers.bar_data.get_tradehistory())
        
        strat.analyzers.bar_data.init_tradehistory()

    def daily_profit(self, strat):
        bar_data_res = strat.analyzers.bar_data.get_analysis()
        dailydata = pd.DataFrame(bar_data_res)
        self.dailyData = dailydata