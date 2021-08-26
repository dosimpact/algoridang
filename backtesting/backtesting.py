from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import json
import requests

from backtrader import strategy
import pandas as pd
import backtrader as bt
import quantstats
from pandas import json_normalize


import numpy as _np

# 거래 개월수
from dateutil.relativedelta import relativedelta
import datetime
import math


from backtesting.BarAnalysis import BarAnalysis
from backtesting.SMACross import SMACross
from backtesting.backTestQuery import backTestQuery


class CBackTtrader(backTestQuery):
    def __init__(self) -> None:
        super().__init__()


    def requestBacktestOneStock(self,id, strategyCode):
        
        print("["+str(id)+"] request strategyCode  "+str(strategyCode))
        print("["+str(id)+"] Start Backtest")
        
        data = self._setInitData(strategyCode)
        if id != None:
            self._initQueue(id, "Running", "Queue" , strategyCode)

        
        
        print("["+str(id)+"] apply Strategy from DB...")

        case = (self._setStrategy(data["strategyCode"]))
        if len(case) == 0 :
            print("DB dose'not have any data in this field...")
            return "error"

        total = 0

        for ticker , strategy, setting, weight ,minDate in case:
            cerebro = bt.Cerebro()
            cerebro.params.tradehistory = True

            #loop 변수만 짧게 나머지는 길게
            for i in range(len(strategy.param)):
                strategy.param[i] = setting[i]

            cerebro.broker.setcash(int(data['investPrice']))
            cerebro.broker.set_coc(True) # 구매 신청시 무조건 최대 금액으로 살 수 있음.

            cerebro.addstrategy(strategy)
            cerebro.addanalyzer(bt.analyzers.PyFolio, _name = 'PyFolio')
            BarAnalysis.ticker = ticker
            cerebro.addanalyzer(BarAnalysis, _name="bar_data")
       
            #pandas data inpute
            cerebro.adddata(bt.feeds.PandasData(dataname = self._getDBData(ticker,minDate,data['startTime'],data['endTime'])),name=ticker)

            print("["+str(id)+"] Start cerebro")
        
            results = cerebro.run()
            #cerebro.plot()
            strat = results[0]
            total+= cerebro.broker.getvalue()

            #####################################################################################
            ### 일간 수익 로그
            dailydata = self.daily_profit(data, strat)

            ### 일간 수익률 
            portfolio_stats = strat.analyzers.getbyname('PyFolio')
            returns, positions, transactions, gross_lev = portfolio_stats.get_pf_items()
            returns.index = returns.index.tz_convert(None)
            
            #for idx, data in returns.items():
            #    print(idx, data)
            metrics = quantstats.reports.metrics(returns, mode='full', display=False)
            #print(metrics)
            #print ("%%%%"*5)
            #print(dailydata)

            
            # 거래 일수
            if data['endTime'] != '':
                delta = datetime.datetime.strptime(data['endTime'],"%Y%m%d") - datetime.datetime.strptime(data['startTime'],"%Y%m%d")  # 두 날짜의 차이 구하기
            else :
                delta = datetime.datetime.now() - datetime.datetime.strptime(data['startTime'],"%Y%m%d")  # 두 날짜의 차이 구하기
            #print(delta.days)

            # 월평균 수익률
            monthlyCAGR = quantstats.stats.cagr(returns)
            monthlyCAGR = round(monthlyCAGR,2)


            # 월간 변동성
            
            yearlyVolatility = quantstats.stats.volatility(returns)
            yearlyVolatility = round(yearlyVolatility,2)

            #월간 수익률 차트 데이터 
            # 최대 상승 개월수 -> 상승개월수 
            monthlyProfitRatioChartDataMeta = quantstats.stats.monthly_returns(returns)
            monthlyProfitRatioChartData = []
            monthlyProfitRatioRiseMonth = 0
            RiseMonth = 0
            for idx ,row in monthlyProfitRatioChartDataMeta.iterrows():
                for i in range(12):
                    monthlydata = [str(idx)+str(i+1).zfill(2)+"01",round(row[i],2)]
                    monthlyProfitRatioChartData.append(monthlydata)
                    if monthlydata[1] > 0:
                        monthlyProfitRatioRiseMonth += 1

            #print("monthlyProfitRatioChartData = ",monthlyProfitRatioChartData)

            # 투자 수익 정보
            investProfitInfo = [total, int(data['investPrice']), total- int(data['investPrice']), round(total / int(data['investPrice']),2)-1]

            #백테스트 상세정보
            backtestDetailInfo = self._makeBackTestInfo(metrics,delta, monthlyProfitRatioRiseMonth,monthlyCAGR,yearlyVolatility)
            #backtestDetailInfo = [metrics.loc['CAGR%']['Strategy'], metrics.loc['Max Drawdown ']['Strategy'],math.ceil(delta.days/30), monthlyProfitRatioRiseMonth ,monthlyCAGR , yearlyVolatility,metrics.loc['Sharpe']['Strategy']]
            #print("backtestDetailInfo = ", backtestDetailInfo)


            # 승수 출력
            winCnt, loseCnt = strat.analyzers.bar_data.get_winloseCnt()
            #print(winCnt,loseCnt)


            # 히스토리 출력하기
            tradehitory = strat.analyzers.bar_data.get_tradehistory()
            #print("tradehitory = ",tradehitory)

            print("["+str(id)+"] Start data saving...")
            # 데이터 저장하기
            
            self._saveHistoryTable(tradehitory,data["strategyCode"])
            print("["+str(id)+"] Start data saving...1")
            self._saveBacktestMonthlyProfitRateChartTable(monthlyProfitRatioChartData,data["strategyCode"])
            print("["+str(id)+"] Start data saving...2")
            self._saveBacktestWinRatioTable(winCnt, loseCnt, data["strategyCode"])
            print("["+str(id)+"] Start data saving...3")
            self._saveBacktestDetailInfoTable(backtestDetailInfo,data["strategyCode"])
            print("["+str(id)+"] Start data saving...4")
            self._saveInvestProfitInfoTable(investProfitInfo , data["strategyCode"])
            print("["+str(id)+"] Start data saving...5")
            self._saveBacktestDailyProfitRateChartTable(returns, data["strategyCode"])
            print("["+str(id)+"] Start data saving...6")
            self._saveAccumulateProfitRateChartTable(dailydata,data["strategyCode"])

            print("["+str(id)+"] Complete data saving!")
            
            break

        if id != None:
            self._initQueue(id, "Success", "Queue" , strategyCode)
        return total


    def _makeBackTestInfo(self, metrics,delta, monthlyProfitRatioRiseMonth,monthlyCAGR,yearlyVolatility):
        CAGR = metrics.loc['CAGR%']['Strategy']
        if CAGR == None or CAGR == ''or math.isnan(CAGR) :
            CAGR = 0

        MDD = metrics.loc['Max Drawdown ']['Strategy']
        if MDD == None or MDD == '' or math.isnan(MDD) :
            MDD = 0

        SHARP = metrics.loc['Sharpe']['Strategy']
        if SHARP == None or SHARP == '' or math.isnan(SHARP) :
            SHARP = 0
        
        backtestDetailInfo = [CAGR, MDD ,math.ceil(delta.days/30), monthlyProfitRatioRiseMonth ,monthlyCAGR , yearlyVolatility,SHARP]

        return backtestDetailInfo
#data startbackTest
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
        SMACross.pfast = 5
        SMACross.pslow = 20
        cerebro.addstrategy(SMACross)

        #pandas data inpute
        cerebro.adddata(bt.feeds.PandasData(dataname = self.getDBData(ticker,startTime,endTime)),name=ticker)
        
        #run strategy
        print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())
        cerebro.run()
        print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())
        #cerebro.plot()

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


    def daily_profit(self, data, strat):
        bar_data_res = strat.analyzers.bar_data.get_analysis()
        dailydata = pd.DataFrame(bar_data_res)
        dailydata = self.__setDailyAccumulate(dailydata,data['investPrice'])
        dailydata.to_csv('saleLog.txt', sep = '\t')
        return dailydata




