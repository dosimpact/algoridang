
import sys

from backtrader import strategy
import pandas as pd
import backtrader as bt
import quantstats
from pandas import json_normalize


import numpy as _np

# 거래 개월수
import datetime
import math


from backtesting.BarAnalysis import BarAnalysis
from backtesting.SMACross import SMACross
from backtesting.backTestQuery import backTestQuery


class CBackTtrader(backTestQuery):
    def __init__(self, id, stratgy) -> None:
        super().__init__(id, stratgy)

    # cerebor work
    def requestBacktestOneStock(self):
        
        print("["+str(self.queueId)+"] request strategyCode  "+str(self.strategyCode))
        print("["+str(self.queueId)+"] Start Backtest")
        
        data = self._setInitData(self.strategyCode)
        
        self._setStatusMemberStrategy("Running","start backtest", self.strategyCode)

        print("["+str(self.queueId)+"] apply Strategy from DB...")

        case = (self._setStrategy(data["strategyCode"]))
        
        if len(case) == 0:
            self._setStatusMemberStrategy( "Error","DB dose not have any data in this field...", self.strategyCode)
            print("DB dose'not have any data in this field...")
            return "error"

        tickerlen = len(case)

        for ticker, salestrategy, setting, weight, minDate in case:
            print("["+str(self.queueId)+"] backtest " + str(ticker))
            self.tickerBackTest(data, tickerlen, ticker, salestrategy, setting, weight, minDate)

        
        print("["+str(self.queueId)+"] make Portpolio")
        try:
            self.makePortpolio(data)
            print("["+str(self.queueId)+"] Start data saving...")
            
            # 데이터 저장하기
            print("["+str(self.queueId)+"] Start data saving...1")
            self._saveBacktestMonthlyProfitRateChartTable()
            print("["+str(self.queueId)+"] Start data saving...2")
            self._saveBacktestWinRatioTable()
            print("["+str(self.queueId)+"] Start data saving...3")
            self._saveBacktestDetailInfoTable()
            print("["+str(self.queueId)+"] Start data saving...4")
            self._saveInvestProfitInfoTable()
            print("["+str(self.queueId)+"] Start data saving...5")
            self._saveBacktestDailyProfitRateChartTable()
            print("["+str(self.queueId)+"] Start data saving...6")
            self._saveAccumulateProfitRateChartTable()

            print("["+str(self.queueId)+"] Complete data saving!")
        
            
            self._setStatusMemberStrategy( "Success","Success", self.strategyCode)

            return self.invest
        except:
            self._setStatusMemberStrategy( "Error","makePortpolio Error", self.strategyCode)
            print("makePortpolio Error")


    # 포트폴리오 만들기
    def makePortpolio(self, data):
        metrics = quantstats.reports.metrics(self.totalreturn, mode='full', display=False)
        self.dailydata = self.calDailyData(int(data['investPrice']))
        print(self.dailydata)

        # 거래 일수
        if data['endTime'] != '':
            delta = datetime.datetime.strptime(data['endTime'],"%Y%m%d") - datetime.datetime.strptime(data['startTime'],"%Y%m%d")  # 두 날짜의 차이 구하기
        else :
            delta = datetime.datetime.now() - datetime.datetime.strptime(data['startTime'],"%Y%m%d")  # 두 날짜의 차이 구하기
        # print(delta.days)

        # 월평균 수익률
        monthlyCAGR = quantstats.stats.cagr(self.totalreturn)
        monthlyCAGR = round(monthlyCAGR, 2)

        # 월간 변동성
        yearlyVolatility = quantstats.stats.volatility(self.totalreturn)
        yearlyVolatility = round(yearlyVolatility, 2)

        # 월간 수익률 차트 데이터 
        # 최대 상승 개월수 -> 상승개월수 
        monthlyProfitRatioChartDataMeta = quantstats.stats.monthly_returns(self.totalreturn)
        monthlyProfitRatioRiseMonth = 0
        
        for idx, row in monthlyProfitRatioChartDataMeta.iterrows():
            for i in range(12):
                monthlydata = [str(idx)+str(i+1).zfill(2)+"01",round(row[i],2)]
                self.monthlyProfitRatioChartData.append(monthlydata)
                if monthlydata[1] > 0:
                    monthlyProfitRatioRiseMonth += 1

        # print("monthlyProfitRatioChartData = ", self.monthlyProfitRatioChartData)

        # 투자 수익 정보
        self.investProfitInfo = [self.invest, int(data['investPrice']), self.invest - int(data['investPrice']), round(self.invest / int(data['investPrice']), 2)-1]
        # print(self.investProfitInfo)
            
        # 백테스트 상세정보
        self.backtestDetailInfo = self._makeBackTestInfo(metrics, delta, monthlyProfitRatioRiseMonth, monthlyCAGR, yearlyVolatility)
        # print("backtestDetailInfo = ", self.backtestDetailInfo)


    def tickerBackTest(self, data, tickerlen, ticker, salestrategy, setting, weight, minDate):
        cerebro = bt.Cerebro()
        BarAnalysis.ticker = ticker
        cerebro.addanalyzer(BarAnalysis, _name="bar_data")
        cerebro.addanalyzer(bt.analyzers.PyFolio, _name='PyFolio')
        
        # 구매 신청시 무조건 최대 금액으로 살 수 있음.
        cerebro.broker.set_coc(True)
        cerebro.params.tradehistory = True

        for i in range(len(salestrategy.param)):
            salestrategy.param[i] = setting[i]                
        cerebro.addstrategy(salestrategy)
                
        cerebro.broker.setcash(int(data['investPrice'])/tickerlen * weight)
        
        tickerDateData, state = self._getDBData(ticker, minDate, data['startTime'], data['endTime'])

        if state == 'pass':
            print("["+str(self.queueId)+"] work Error")
            self.invest += int(data['investPrice'])/tickerlen * weight
            del cerebro
            return

        cerebro.adddata(bt.feeds.PandasData(dataname=tickerDateData), name=ticker)

        print("["+str(self.queueId)+"] Start cerebro")

        try:
            results = cerebro.run()
        except:
            self._setStatusMemberStrategy( "Error",  "cerebro.run() error",self.strategyCode)
            print("cerebro.run() error")
            print(tickerDateData)
            print(salestrategy)
            return

        strat = results[0]
        self.invest += cerebro.broker.getvalue()
                
        #####################################################################################
        # 일간 수익 로그
        self.daily_profit(strat)

        # 일간 수익률 
        portfolio_stats = strat.analyzers.getbyname('PyFolio')
        returns, positions, transactions, gross_lev = portfolio_stats.get_pf_items()
        returns.index = returns.index.tz_convert(None)
        if len(self.totalreturn) == 0:
            self.totalreturn = returns
        else:
            self.totalreturn = self.totalreturn + returns
                    
        # 승수 출력
        winCnt, loseCnt = strat.analyzers.bar_data.get_winloseCnt()
        self.win += winCnt
        self.lose += loseCnt

        # 히스토리 출력하기
        self.tradehitory = strat.analyzers.bar_data.get_tradehistory()
        self._saveHistoryTable()
        
        # cerebro.plot()
        strat.analyzers.bar_data.init_tradehistory()
        del cerebro



    def _makeBackTestInfo(self, metrics, delta, monthlyProfitRatioRiseMonth, monthlyCAGR, yearlyVolatility):
        CAGR = metrics.loc['CAGR%']['Strategy']
        if CAGR is None or CAGR == ''or math.isnan(CAGR):
            CAGR = 0

        MDD = metrics.loc['Max Drawdown ']['Strategy']
        if MDD is None or MDD == '' or math.isnan(MDD):
            MDD = 0

        SHARP = metrics.loc['Sharpe']['Strategy']
        if SHARP is None or SHARP == '' or math.isnan(SHARP):
            SHARP = 0
        
        backtestDetailInfo = [CAGR, MDD, math.ceil(delta.days/30), monthlyProfitRatioRiseMonth, monthlyCAGR, yearlyVolatility, SHARP]

        return backtestDetailInfo
    
    #data startbackTest
    def startbackTest(self, tickerList, cash, startTime, endTime=None):
        if type(tickerList) is list: 
            ticker = tickerList[0]
        else:
            ticker = tickerList

        cerebro = bt.Cerebro()
        # cash setting
        cerebro.broker.setcash(int(cash))
        dateparser = lambda x: pd.datetime.strptime(x, '%Y-%m-%d')

        cerebro.broker.set_coc(True)
        # Add a strategy
        SMACross.pfast = 5
        SMACross.pslow = 20
        cerebro.addstrategy(SMACross)

        # pandas data inpute
        cerebro.adddata(bt.feeds.PandasData(dataname = self.getDBData(ticker,startTime,endTime)),name=ticker)
        
        # run strategy
        print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())
        cerebro.run()
        print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())
        # cerebro.plot()

        return cerebro.broker.getvalue()




    def __setDailyAccumulate(self, data, init):
        sum = []
        for idx, row in data.iterrows():
            sumdata = 0

            for i in range(len(row[0])):
                sumdata += row[0][i][7]
            sum.append(round(sumdata/init - 1,2))
        data['DCR'] = sum
        return data



    def daily_profit(self, strat):
        bar_data_res = strat.analyzers.bar_data.get_analysis()
        dailydata = pd.DataFrame(bar_data_res)
        if len(self.totalDailyData) == 0:
            self.totalDailyData = dailydata
        else:
            self.totalDailyData = self.totalDailyData + dailydata
        

    def calDailyData(self, investPrice):
        dailydata = self.__setDailyAccumulate(self.totalDailyData, investPrice)
        dailydata.to_csv('saleLog.txt', sep = '\t')
        return dailydata



