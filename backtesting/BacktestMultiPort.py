
import sys
from backtesting.Backtest import Backtest
from DB.connectionPool import databasepool
import quantstats

from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI


import datetime
import math


class BacktestMultiPort(Backtest):
    """데이터 베이스 친화적 멀티 포트 클래스"""
    def __init__(self,strategyCode) -> None:
        super().__init__()
        self.strategyCode = strategyCode
        self.multiInvest = 0
        self.multiTotalreturn = None
        self.multiWin = 0
        self.multiLose = 0
        self.multiTradehitory = None
        self.multiDailyData = None
        self.portMonthlyProfitRatioChartData = []

    def portBacktest(self):
        periodInfo = self.getPeriodInfo()
        if len(periodInfo) == 0:
            print("DB dose'not have any data in this field...")
            return "error"

        case = self.getPortInfoFromDB()
        # data 가 없는 경우
        if len(case) == 0:
            print("DB dose'not have any data in this field...")
            return "error"

        self.MultiPortBacktest(periodInfo['investPrice'], case, periodInfo['startTime'], periodInfo['endTime'])
        self.makePortpolio()
        self.makeDBDataSet(periodInfo['investPrice'],periodInfo['startTime'], periodInfo['endTime'])
        self.saveDB()
        return "Done"

    def MultiPortBacktest(self, cash, case, startTime, endTime):

        tickerlen = len(case)

        for ticker, salestrategy, setting, weight, minDate in case:
            print("["+str(self.strategyCode)+"] backtest : " + str(ticker))
            for i in range(len(salestrategy.param)):
                salestrategy.param[i] = setting[i]         
            
            invest , strat =self.backtest(ticker, cash/tickerlen * weight, salestrategy, startTime, endTime, minDate)
            self.multiInvest += invest

            self.makebacktestResult(strat)

            if self.multiTotalreturn is None:
                self.multiTotalreturn = self.totalreturn
            else:
                self.multiTotalreturn.add(self.totalreturn,fill_value=0)

            if self.multiDailyData is None:
                self.multiDailyData = self.dailyData
            else:
                self.multiDailyData = self.multiDailyData + self.dailyData

            self.multiWin += self.win
            self.multiLose += self.lose


    def getPortInfoFromDB(self):
        strategyList = []
        DBClass = databasepool()
        conn = DBClass.getConn()
        if DBClass:
            query = "select u.strategy_code,u.ticker, u.trading_strategy_name ,u.setting_json from universal u where u.strategy_code = "+str(self.strategyCode)
            
            df = DBClass.selectDataframe(conn, query)
            DBClass.putConn(conn)
            for index, row in df.iterrows():
                if row[2] == 'GoldenCross':
                    setting = [row[3]['GoldenCross']['pfast'],row[3]['GoldenCross']['pslow']]
                    minDate = row[3]['GoldenCross']['pslow']
                    strategyList.append((row[1], SMACross, setting, 1, minDate)) 
                if row[2] == 'RSI':
                    setting = [row[3]['RSI']['pfast'],row[3]['RSI']['pslow']]
                    minDate = 21
                    strategyList.append((row[1], RSI, setting, 1, minDate)) 

        return strategyList

    def getPeriodInfo(self):
        data = {}
        data["strategyCode"] = self.strategyCode

        DBClass = databasepool()
        conn = DBClass.getConn()
        try:

            query = "select invest_start_date, invest_principal, strategy_code, securities_corp_fee, invest_end_date"
            query += " from invest_profit_info where  strategy_code = " + str(self.strategyCode)
            res = DBClass.selectData(conn,query)
            DBClass.putConn(conn)
        except:
            print("_setInitData Unexpected error:") 
            DBClass.putConn(conn)

        if len(res) != 0 :
            data['startTime'] = str(res[0][0])[:10].replace("-","")
            data['investPrice'] = res[0][1]
            data['securitiesCorpFee'] = float(res[0][3])
            if res[0][4] != None:
                data['endTime'] = str(res[0][4])[:10].replace("-","")
            else:
                data['endTime'] = ""
        else:
            data['startTime'] = '20200101'
            data['investPrice'] = 1000
            data['securitiesCorpFee'] = 0.1
            data['endTime'] = '20200102'

        return data

    def makePortpolio(self):
        """ 단일종목 포트폴리오 """
        self.metrics = quantstats.reports.metrics(self.multiTotalreturn, mode='full', display=False)
        
        # 월간 수익률 차트 데이터 
        # 최대 상승 개월수 -> 상승개월수 
        monthlyProfitRatioChartDataMeta = quantstats.stats.monthly_returns(self.multiTotalreturn)
        self.monthlyProfitRatioRiseMonth = 0
        
        for idx, row in monthlyProfitRatioChartDataMeta.iterrows():
            for i in range(12):
                monthlydata = [str(idx)+str(i+1).zfill(2)+"01",round(row[i],2)]
                self.portMonthlyProfitRatioChartData.append(monthlydata)
                if monthlydata[1] > 0:
                    self.monthlyProfitRatioRiseMonth += 1
    
#####################DB dataSet#######################################
    def makeDBDataSet(self,investPrice,startTime,EndTime = None):
        
        self.multiDailyData = self.calDailyData(int(investPrice))

        # 거래 일수
        if EndTime != '':
            delta = datetime.datetime.strptime(EndTime ,"%Y%m%d") - datetime.datetime.strptime(startTime,"%Y%m%d")  # 두 날짜의 차이 구하기
        else :
            delta = datetime.datetime.now() - datetime.datetime.strptime(startTime,"%Y%m%d")  # 두 날짜의 차이 구하기
        # print(delta.days)

        # 투자 수익 정보
        self.DBdataInvestProfitInfo = [self.multiInvest, int(investPrice), self.multiInvest - int(investPrice), round(self.multiInvest / int(investPrice), 2)-1]
        # print(self.investProfitInfo)
            
        # 백테스트 상세정보
        self.DBdataBacktestDetailInfo = self.makeBackTestInfo(delta)
        # print("backtestDetailInfo = ", self.backtestDetailInfo)
        pass


    def calDailyData(self, investPrice):
        dailydata = self.__setDailyAccumulate(self.dailyData, investPrice)
        dailydata.to_csv('saleLog.txt', sep = '\t')
        return dailydata

    
    def __setDailyAccumulate(self, data, init):
        sum = []
        for idx, row in data.iterrows():
            sumdata = 0
            if type(row[0]) != type([]):
                sum.append(0)
                continue

            for i in range(len(row[0])):
                sumdata += row[0][i][7]
            sum.append(round(sumdata/init - 1,2))
        data['DCR'] = sum
        return data


    def makeBackTestInfo(self, delta):
        CAGR = self.metrics.loc['CAGR%']['Strategy']
        if CAGR is None or CAGR == ''or math.isnan(CAGR):
            CAGR = 0

        MDD = self.metrics.loc['Max Drawdown ']['Strategy']
        if MDD is None or MDD == '' or math.isnan(MDD):
            MDD = 0

        SHARP = self.metrics.loc['Sharpe']['Strategy']
        if SHARP is None or SHARP == '' or math.isnan(SHARP):
            SHARP = 0
        
        backtestDetailInfo = [CAGR, MDD, math.ceil(delta.days/30), self.monthlyProfitRatioRiseMonth,  CAGR,  self.metrics.loc['Volatility (ann.) ']['Strategy'], SHARP]

        return backtestDetailInfo
    
    def saveDB(self):
        print("["+str(self.strategyCode)+"] Start data saving...")
        
        # 데이터 저장하기
        print("["+str(self.strategyCode)+"] Start data saving...1")
        self._saveBacktestMonthlyProfitRateChartTable()
        print("["+str(self.strategyCode)+"] Start data saving...2")
        self._saveBacktestWinRatioTable()
        print("["+str(self.strategyCode)+"] Start data saving...3")
        self._saveBacktestDetailInfoTable()
        print("["+str(self.strategyCode)+"] Start data saving...4")
        self._saveInvestProfitInfoTable()
        print("["+str(self.strategyCode)+"] Start data saving...5")
        self._saveBacktestDailyProfitRateChartTable()
        print("["+str(self.strategyCode)+"] Start data saving...6")
        self._saveAccumulateProfitRateChartTable()

        print("["+str(self.strategyCode)+"] Complete data saving!")
        self._setStatusMemberStrategy( "Success","Success", self.strategyCode)
        return "Done"
        
########################################################################################
    def _saveBacktestWinRatioTable(self):
        win = self.multiWin
        lose = self.multiLose
        strategyCode = self.strategyCode

        DBClass = databasepool()
        conn = DBClass.getConn()
        try:
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
            
            conn.commit()
            DBClass.putConn(conn)
        except:
            self._setStatusMemberStrategy( "Error",  "_saveBacktestWinRatioTable Unexpected error",self.strategyCode)
            print("_saveBacktestWinRatioTable Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)

    def _saveBacktestMonthlyProfitRateChartTable(self):

        monthlyProfitRatioChartData = self.portMonthlyProfitRatioChartData
        strategyCode = self.strategyCode

        DBClass = databasepool()
        conn = DBClass.getConn()
        try:
            for i in range(len(monthlyProfitRatioChartData)):
                query = "select * from backtest_monthly_profit_rate_chart where chart_month = " + "\'"+str(monthlyProfitRatioChartData[i][0]) + "\'  "
                query += " and strategy_code = " + str(strategyCode) + ";"

                if len(DBClass.selectData(conn, query)) == 1:
                    query = "update backtest_monthly_profit_rate_chart set "
                    query += "  \"profit_rate\" = " + str(monthlyProfitRatioChartData[i][1])
                    query += "  where strategy_code = "+str(strategyCode)
                    query += "  and chart_month = " + "\'" + str(monthlyProfitRatioChartData[i][0]) + "\';"
                    DBClass.updateData(conn, query)

                else:
                    query = "insert into backtest_monthly_profit_rate_chart(\"chart_month\",\"profit_rate\",\"strategy_code\")"
                    query += "values(\'"+str(monthlyProfitRatioChartData[i][0]) + "\'," + str(monthlyProfitRatioChartData[i][1]) + "," + str(strategyCode) + ")"
                    DBClass.insertIntoData(conn, query)
            
            conn.commit()
            DBClass.putConn(conn)
        except:
            self._setStatusMemberStrategy( "Error","_saveBacktestMonthlyProfitRateChartTable Unexpected error", self.strategyCode)
            print("_saveBacktestMonthlyProfitRateChartTable Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)

    def _saveAccumulateProfitRateChartTable(self ):
        data = self.multiDailyData
        strategyCode = self.strategyCode
        
        DBClass = databasepool()
        conn = DBClass.getConn()
        try:
            for idx, row in data.iterrows():
                
                if type(row[0]) != type([]):
                    continue
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
        except:
            self._setStatusMemberStrategy( "Error", '_saveAccumulateProfitRateChartTable Unexpected error', self.strategyCode)
            print("_saveAccumulateProfitRateChartTable Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)

    def _setStatusMemberStrategy(self, state, statusSting, strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()

        query = "update member_strategy set "
        query += " status_code = \'" + str(state) + "\',"
        query += " status_info = \'" + str(statusSting) + "\'"
        query += " where strategy_code = " + str(strategyCode) + ";"
        try:
            DBClass.updateData(conn,query)
            conn.commit()
            DBClass.putConn(conn)
        except:
            print("_setStatusMemberStrategy Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)

    def _saveBacktestDetailInfoTable(self):
        backtestDetailInfo = self.DBdataBacktestDetailInfo
        strategyCode = self.strategyCode

        DBClass = databasepool()
        conn = DBClass.getConn()
        try:
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
                query+= "values(" + str(backtestDetailInfo[0])+"," + str(backtestDetailInfo[1]) + "," + str(backtestDetailInfo[2]) +"," + str(backtestDetailInfo[3]) + "," + str(backtestDetailInfo[4]) + "," + str(backtestDetailInfo[5]) + ","+ str(strategyCode)+ ","+ str(backtestDetailInfo[6])+ ");"
                DBClass.insertIntoData(conn,query)
            conn.commit()
            DBClass.putConn(conn)
        except:
            self._setStatusMemberStrategy( "Error","_saveBacktestDetailInfoTable Unexpected error",  self.strategyCode)
            print("_saveBacktestDetailInfoTable Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)

    def _saveInvestProfitInfoTable(self):
        investProfitInfo = self.DBdataInvestProfitInfo
        strategyCode = self.strategyCode
        DBClass = databasepool()
        conn = DBClass.getConn()
        try:
            query = "update invest_profit_info set "
            query += " invest_price = " +str(investProfitInfo[0]) +","
            query += " invest_principal = " +str(investProfitInfo[1]) +","
            query += " total_profit_price = " +str(investProfitInfo[2]) +","
            query += " profit_rate = " +str(investProfitInfo[3])
            query += " where strategy_code = " +str(strategyCode)+";"

            DBClass.updateData(conn,query)
            conn.commit()
            DBClass.putConn(conn)
        except:
            self._setStatusMemberStrategy( "Error",  self.strategyCode)
            print("_saveInvestProfitInfoTable Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)

    def _saveBacktestDailyProfitRateChartTable(self):

        returns = self.multiTotalreturn
        strategyCode = self.strategyCode

        DBClass = databasepool()
        conn = DBClass.getConn()
        try:
                
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
        except:
            self._setStatusMemberStrategy( "Error", "_saveBacktestDailyProfitRateChartTable Unexpected error", self.strategyCode)
            print("_saveBacktestDailyProfitRateChartTable Unexpected error:", sys.exc_info()[0]) 
            DBClass.putConn(conn)