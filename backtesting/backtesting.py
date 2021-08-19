from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import json
from backtrader import strategy
#from quantstats._plotting.wrappers import daily_returns
import requests
import pandas as pd
import backtrader as bt
from pandas import json_normalize

import quantstats

from openAPI.DB.DB import databasepool
import numpy as _np

# 거래 개월수
from dateutil.relativedelta import relativedelta
import datetime
import math

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


   

class CBackTtrader(object):
    def __init__(self) -> None:
        super().__init__()

   


    def getDBData(self,ticker, start, end = None):
        DBClass = databasepool()
        conn = DBClass.getConn()
        if DBClass:
            query = "select stock_date, open_price, high_price, low_price, close_price, volume from daily_stock"
            query += " where \"ticker\" = \'"+ticker+"\' order by stock_date asc;"
            
            df = DBClass.selectDataframe(conn,query)
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

            DBClass.putConn(conn)

            return res
        return "error"

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

    def __setStrategy(self, strategyCode):
        strategyList = []
        DBClass = databasepool()
        conn = DBClass.getConn()
        if DBClass:
            query = "select u.strategy_code,u.ticker, u.trading_strategy_name ,u.setting_json from universal u where u.strategy_code = "+str(strategyCode)
            
            df = DBClass.selectDataframe(conn,query)
            DBClass.putConn(conn)
            for index, row in df.iterrows():
                if  row[2]== 'GoldenCross':
                    setting = [row[3]['GoldenCross']['pfast'],row[3]['GoldenCross']['pslow']]
                    setting = [5,20]
                    strategyList.append(( row[1] , SMACross ,setting, 1)) 

        return strategyList
        #(ticker, strategy, setting , weigth)
    

    def __saveHistoryTable(self, tradehitory,strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()
        
        for i in range(len(tradehitory)):
            query  = "select * from history "
            query += " where strategy_code = " + str(strategyCode)
            query += " and ticker = \'" + str(tradehitory[i][3])+"\'"
            query += " and history_date = \'"+str(tradehitory[i][0]) + "\';"

            if len(DBClass.selectData(conn,query)) == 1:
                if tradehitory[i][2] != None :
                    query = "update history set "
                    query += " buy_sale_price = " + str(tradehitory[i][1]) + ","
                    query += " profit_loss_rate = " + str(tradehitory[i][2])
                    query += " where strategy_code = " + str(strategyCode)
                    query += " and ticker = \'" + str(tradehitory[i][3]) + "\'"
                    query += " and history_date = \'"+str(tradehitory[i][0]) + "\';"
                    DBClass.updateData(conn,query)
                else :
                    query = "update history set "
                    query += " buy_sale_price = " + str(tradehitory[i][1]) 
                    query += " where strategy_code = " + str(strategyCode)
                    query += " and ticker =  \'" + str(tradehitory[i][3]) + "\'"
                    query += " and history_date = \'"+str(tradehitory[i][0]) + "\';"
                    DBClass.updateData(conn,query)
                
            else :
                if tradehitory[i][2] != None :
                    query = "insert into history(\"history_date\",\"buy_sale_price\",\"profit_loss_rate\",\"strategy_code\",\"ticker\")"
                    query += "values(\'"+str(tradehitory[i][0]) + "\'," + str(tradehitory[i][1])+","+str(tradehitory[i][2])+","+str(strategyCode)+",\'"+str(tradehitory[i][3]) + "\')"
                    #print(query)

                else :
                    query = "insert into history(\"history_date\",\"buy_sale_price\",\"strategy_code\",\"ticker\")"
                    query += "values(\'"+str(tradehitory[i][0]) + "\'," + str(tradehitory[i][1])+","+str(strategyCode)+",\'"+str(tradehitory[i][3]) + "\')"
                    #print(query)

            DBClass.insertIntoData(conn,query)
        conn.commit()
        
        DBClass.putConn(conn)
    

    def __saveBacktestDailyProfitRateChartTable(self,returns, strategyCode):

        DBClass = databasepool()
        conn = DBClass.getConn()

        for idx,value in returns.iteritems():
            query = "select * from backtest_daily_profit_rate_chart where chart_month = " + "\'"+str(idx) + "\'  "
            query += " and strategy_code = " + str(value) + ";"

            if len(DBClass.selectData(conn,query)) == 1:
                query = "update backtest_daily_profit_rate_chart set "
                query += "  \"profit_rate\" = " + str(value)
                query += "  where strategy_code = "+str(strategyCode)
                query += "  and chart_month = " + "\'" + str(idx) + "\';"
                DBClass.updateData(conn,query)

            else :
                query = "insert into backtest_daily_profit_rate_chart(\"chart_month\",\"profit_rate\",\"strategy_code\")"
                query += "values(\'"+str(idx) + "\'," + str(value) +","+str(strategyCode)+")"
                DBClass.insertIntoData(conn,query)

        conn.commit()
        DBClass.putConn(conn)



    def __saveBacktestMonthlyProfitRateChartTable(self,monthlyProfitRatioChartData,strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()

        #query = "delete from backtest_monthly_profit_rate_chart where strategy_code = "+str(strategyCode)+";"
        #DBClass.deleteData(conn,query)


        
        for i in range(len(monthlyProfitRatioChartData)):
            query = "select * from backtest_monthly_profit_rate_chart where chart_month = " + "\'"+str(monthlyProfitRatioChartData[i][0]) + "\'  "
            query += " and strategy_code = " + str(strategyCode) + ";"

            if len(DBClass.selectData(conn,query)) == 1:
                query = "update backtest_monthly_profit_rate_chart set "
                query += "  \"profit_rate\" = " + str(monthlyProfitRatioChartData[i][1])
                query += "  where strategy_code = "+str(strategyCode)
                query += "  and chart_month = " + "\'" + str(monthlyProfitRatioChartData[i][0]) + "\';"
                DBClass.updateData(conn,query)

            else :
                query = "insert into backtest_monthly_profit_rate_chart(\"chart_month\",\"profit_rate\",\"strategy_code\")"
                query += "values(\'"+str(monthlyProfitRatioChartData[i][0]) + "\'," + str(monthlyProfitRatioChartData[i][1]) +","+str(strategyCode)+")"
                DBClass.insertIntoData(conn,query)
        
        conn.commit()
        DBClass.putConn(conn)


    def __saveBacktestWinRatioTable(self,win,lose,strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()
        query = "select * from backtest_win_ratio where strategy_code = "+str(strategyCode)+";"
        if len (DBClass.selectData(conn,query)) == 1:
            query = "update backtest_win_ratio set "
            query += " \"win_count\" = " + str(win) + ","
            query += " \"loss_count\" = " + str(lose)
            query += " where strategy_code = "+str(strategyCode)+";"
            DBClass.updateData(conn,query)

        else:
            query = "insert into backtest_win_ratio(\"win_count\",\"loss_count\",\"strategy_code\")"
            query += "values("+str(win) + "," + str(lose) +","+str(strategyCode)+")"
            DBClass.insertIntoData(conn,query)
        
        # DELEET TEST CODE
        # print(DBClass.selectData(conn,"select * from member_strategy where strategy_code = 1"))

        conn.commit()
        DBClass.putConn(conn)


    def __saveBacktestDetailInfoTable(self,backtestDetailInfo,strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()
        query = "select * from backtest_detail_info where strategy_code = " + str(strategyCode) + ";"
        if len(DBClass.selectData(conn,query)) == 1:
            query = "update backtest_detail_info set"
            query += " \"year_avg_profit_rate\" = " + str(backtestDetailInfo[0])+ ","
            query += " \"mdd\" = " + str(backtestDetailInfo[1])+ ","
            query += " \"trading_month_count\" = " + str(backtestDetailInfo[2])+ ","
            query += " \"rising_month_count\" = " + str(backtestDetailInfo[3])+ ","
            query += " \"month_avg_profit_rate\" = " + str(backtestDetailInfo[4])+ ","
            query += " \"yearly_volatility\" = " + str(backtestDetailInfo[5])+ ","
            query += " \"sharp\" = " + str(backtestDetailInfo[6])+ ","
            query += " \"monthly_volatility\" = " + '0'
            query += " where strategy_code = " +str(strategyCode)+";"
            DBClass.updateData(conn,query)
        else :
            query = "insert into backtest_detail_info(\"year_avg_profit_rate\", \"mdd\", \"trading_month_count\", \"rising_month_count\", \"month_avg_profit_rate\", \"yearly_volatility\", \"strategy_code\", \"sharp\")"
            query+= "values(" + str(backtestDetailInfo[0])+"," + str(backtestDetailInfo[1]) + "," + str(backtestDetailInfo[2]) +"," + str(backtestDetailInfo[3]) + "," + str(backtestDetailInfo[4]) + "," + str(backtestDetailInfo[5]) + ","+ str(strategyCode)+ ""+ str(backtestDetailInfo[6])+ ");"
            DBClass.insertIntoData(conn,query)
        conn.commit()
        DBClass.putConn(conn)


    def __saveInvestProfitInfoTable(self, investProfitInfo , strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()

        query = "update invest_profit_info set "
        query += " invest_price = " +str(investProfitInfo[0]) +","
        query += " invest_principal = " +str(investProfitInfo[1]) +","
        query += " total_profit_price = " +str(investProfitInfo[2]) +","
        query += " profit_rate = " +str(investProfitInfo[3])
        query += " where strategy_code = " +str(strategyCode)+";"

        DBClass.updateData(conn,query)
        conn.commit()
        DBClass.putConn(conn)

    def __saveAccumulateProfitRateChartTable(self, data, strategyCode ):
        DBClass = databasepool()
        conn = DBClass.getConn()
        for idx, row in data.iterrows():
                
            query = "select * from accumulate_profit_rate_chart where strategy_code = " + str(strategyCode)
            query += " and chart_date = \'" + str(idx)+"\';"
            
            if len(DBClass.selectData(conn, query)) == 1:
                query  = "update accumulate_profit_rate_chart set"
                query += " profit_rate = " + str(row[1])
                query += " where strategy_code = " + str(strategyCode)
                query += " and chart_date = \'" + str(idx) + "\';"
                DBClass.updateData(conn, query)
            else :
                query  = "insert into accumulate_profit_rate_chart(\"profit_rate\",\"chart_date\",\"strategy_code\")"
                query += " values("+ str(row[1]) + ",\'" + str(idx) + "\'," + str(strategyCode)+")"
                DBClass.insertIntoData(conn,query)
        conn.commit()
        DBClass.putConn(conn)


    def __setInitData(self, strategyCode):
        data = {}
        data["strategyCode"] = strategyCode

        DBClass = databasepool()
        conn = DBClass.getConn()

        query = "select invest_start_date, invest_principal, strategy_code, securities_corp_fee, invest_end_date"
        query += " from invest_profit_info where  strategy_code = " + str(strategyCode)
        res = DBClass.selectData(conn,query)
        DBClass.putConn(conn)


        data['startTime'] = str(res[0][0])[:10].replace("-","")
        data['investPrice'] = res[0][1]
        data['securitiesCorpFee'] = float(res[0][3])
        if res[0][4] != None:
            data['endTime'] = str(res[0][4])[:10].replace("-","")
        else:
            data['endTime'] = ""

        return data


    def __setDailyAccumulate(self, data, init):
        sum = []
        for idx, row in data.iterrows():
            sumdata = 0

            for i in range(len(row[0])):
                sumdata += row[0][i][7]
            sum.append(round(sumdata/init - 1,2))
        data['DCR'] = sum
        return data


    def __initQueue(self, id , state, info, strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()
        query = "select * from backtest_queue where queue_code = \'" + str(id) + "\';"

        if len(DBClass.selectData(conn,query)) == 1:
            query = "update backtest_queue set "
            query += " state_info = \'" + str(state) + "\',"
            query += " work_info = \'" + str(info) + "\'"
            query += " where queue_code = \'" + str(id) + "\';"
            DBClass.updateData(conn,query)
        else:
            query = "insert into backtest_queue(\"queue_code\",\"state_info\",\"work_info\",\"strategy_code\")"
            query += " values(\'" + str(id) + "\',\'"+ str(state) +"\',\'" + str(info)+ "\'," + str(strategyCode) + ")"
            DBClass.insertIntoData(conn,query)

        conn.commit()
        DBClass.putConn(conn)


#해당클래스 가장위로
    def requestBacktestOneStock(self,id, strategyCode):
        
        print("[",id,"] request strategyCode",strategyCode)
        print("[",id,"] Start Backtest")
        
        data = self.__setInitData(strategyCode)
        if id != None:
            self.__initQueue(id, "Running", "Queue" , strategyCode)

        
        print("[",id,"] apply Strategy from DB...")
        case = (self.__setStrategy(data["strategyCode"]))
        if len(case) == 0 :
            print("DB dose'not have any data in this field...")
            return "error"

        total = 0

#ticker , stg, setting , wgt줄임말 없이 사용
        for ticker , stg, setting, wgt in case:
            cerebro = bt.Cerebro()
            cerebro.params.tradehistory = True

            #loop 변수만 짧게 나머지는 길게
            for i in range(len(stg.param)):
                SMACross.param[i] = setting[i]

            cerebro.broker.setcash(int(data['investPrice']))
            cerebro.broker.set_coc(True) # 구매 신청시 무조건 최대 금액으로 살 수 있음.
            cerebro.addstrategy(SMACross)
            cerebro.addanalyzer(bt.analyzers.PyFolio, _name = 'PyFolio')
            BarAnalysis.ticker = ticker
            cerebro.addanalyzer(BarAnalysis, _name="bar_data")
       
            #pandas data inpute
            cerebro.adddata(bt.feeds.PandasData(dataname = self.getDBData(ticker,data['startTime'],data['endTime'])),name=ticker)
            

            print("[",id,"] Start backtest")
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
            backtestDetailInfo = [metrics.loc['CAGR%']['Strategy'], metrics.loc['Max Drawdown ']['Strategy'],math.ceil(delta.days/30), monthlyProfitRatioRiseMonth ,monthlyCAGR , yearlyVolatility,metrics.loc['Sharpe']['Strategy']]
            print("backtestDetailInfo = ", backtestDetailInfo)


            # 승수 출력
            winCnt, loseCnt = strat.analyzers.bar_data.get_winloseCnt()
            #print(winCnt,loseCnt)


            # 히스토리 출력하기
            tradehitory = strat.analyzers.bar_data.get_tradehistory()
            #print("tradehitory = ",tradehitory)

            print("[",id,"] Start data saving...")
            # 데이터 저장하기
            
            self.__saveHistoryTable(tradehitory,data["strategyCode"])
            self.__saveBacktestMonthlyProfitRateChartTable(monthlyProfitRatioChartData,data["strategyCode"])
            self.__saveBacktestWinRatioTable(winCnt, loseCnt, data["strategyCode"])
            self.__saveBacktestDetailInfoTable(backtestDetailInfo,data["strategyCode"])
            self.__saveInvestProfitInfoTable(investProfitInfo , data["strategyCode"])
            self.__saveBacktestDailyProfitRateChartTable(returns, data["strategyCode"])
            self.__saveAccumulateProfitRateChartTable(dailydata,data["strategyCode"])

            print("[",id,"] Complete data saving!")
            
            break


        if id != None:
            self.__initQueue(id, "Success", "Queue" , strategyCode)
        return total

    def daily_profit(self, data, strat):
        bar_data_res = strat.analyzers.bar_data.get_analysis()
        dailydata = pd.DataFrame(bar_data_res)
        dailydata = self.__setDailyAccumulate(dailydata,data['investPrice'])
        dailydata.to_csv('saleLog.txt', sep = '\t')
        return dailydata




