
from openAPI.DB.connectionPool import databasepool
import pandas as pd
from backtesting.SMACross import SMACross

class backTestQuery(object):
    
    def _setStrategy(self, strategyCode):
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
                    minDate = row[3]['GoldenCross']['pslow']
                    strategyList.append(( row[1] , SMACross ,setting, 1, minDate)) 

        return strategyList
        #(ticker, strategy, setting , weigth)
    

    def _getDBData(self,ticker,mindatalen, start, end = None):
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
            alllen = len(df)
            backtestlen =  len(df[str(pd.to_datetime(start, format='%Y-%m-%d')) : ])
            getDataPosStr = alllen - backtestlen - mindatalen
            if getDataPosStr > 0:
                if end == None or end == '':
                    res = df[getDataPosStr : ]
                else:
                    getDataPosEnd = len(df[  :str(pd.to_datetime(end, format='%Y-%m-%d')) ])
                    res = df[ getDataPosStr :getDataPosEnd ]

            else:
                return "error"        

            DBClass.putConn(conn)

            return res
        return "error"

        
    def _saveHistoryTable(self, tradehitory,strategyCode):
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


        
    def _saveBacktestDailyProfitRateChartTable(self,returns, strategyCode):

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


    def _saveBacktestMonthlyProfitRateChartTable(self,monthlyProfitRatioChartData,strategyCode):
        DBClass = databasepool()
        conn = DBClass.getConn()
        
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


    def _saveBacktestWinRatioTable(self,win,lose,strategyCode):
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
        
        conn.commit()
        DBClass.putConn(conn)


    def _saveBacktestDetailInfoTable(self,backtestDetailInfo,strategyCode):
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
            query+= "values(" + str(backtestDetailInfo[0])+"," + str(backtestDetailInfo[1]) + "," + str(backtestDetailInfo[2]) +"," + str(backtestDetailInfo[3]) + "," + str(backtestDetailInfo[4]) + "," + str(backtestDetailInfo[5]) + ","+ str(strategyCode)+ ","+ str(backtestDetailInfo[6])+ ");"
            DBClass.insertIntoData(conn,query)
        conn.commit()
        DBClass.putConn(conn)


    def _saveInvestProfitInfoTable(self, investProfitInfo , strategyCode):
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


    def _saveAccumulateProfitRateChartTable(self, data, strategyCode ):
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

    def _initQueue(self, id , state, info, strategyCode):
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

        
    def _setInitData(self, strategyCode):
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
