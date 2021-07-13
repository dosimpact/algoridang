from pykrx import stock
from .DB.DB import psql
from datetime import datetime, timedelta


class CPricePykrx(object):
    
    __db = psql()
    __test = 0
    __state = 0
    def __init__(self,test=0):
        self.__test = test


    def __printPercent(self, total, now):
        if now == total - 1:
            self.__state = 0
            print("100%")
        elif now/total > 0.9 and self.__state == 8:
            self.__state = 9
            print("90%")
        elif now/total > 0.8 and self.__state == 7:
            self.__state = 8
            print("80%")
        elif now/total > 0.7 and self.__state == 6:
            self.__state = 7
            print("70%")
        elif now/total > 0.6 and self.__state == 5:
            self.__state = 6
            print("60%")
        elif now/total > 0.5 and self.__state == 4:
            self.__state = 5
            print("50%")
        elif now/total > 0.4 and self.__state == 3:
            self.__state = 4
            print("40%")
        elif now/total > 0.3 and self.__state == 2:
            self.__state = 3
            print("30%")
        elif now/total > 0.2 and self.__state == 1:
            self.__state = 2
            print("20%")
        elif now/total > 0.1 and self.__state == 0:
            self.__state = 1
            print("10%")




    #모든 종목 리스트 가져오기
    def __getKRStockCodeAll(self):
        stockList = stock.get_market_ticker_list(None,"ALL")
        return stockList
    
    #모든 종목리스트 전송
    def __sendKRStockCodeAll(self,codelist):
        count = 0
        nameList = []
        for ticker in codelist:
            #데이터 유무 확인
            name = stock.get_market_ticker_name(ticker)
            queryWhere = "\"STOCK_CODE\" = \'"+ticker+"\';"

            #없는경우 데이터 입력
            if len(self.__db.selectData("*","stock",queryWhere)) == 0:
                queryTable = "STOCK( \"STOCK_CODE\", \"STOCK_NAME\")"
                queryValue = "(\'"+ticker+"\',\'"+name+"\')"
                self.__db.insertIntoDataToTable(queryTable,queryValue)
                count = count + 1

                nameList.append(name)
            
        print(count,"data input to database")
        if self.__test == 1:
            print("__Test : Added Stock Name\n",nameList)
        return "__Test : Added Stock Name\n"+str(nameList)

    def __getAllTickerFromDB(self):
        tickerList = []
        querySelect = "*"
        queryTable = "STOCK"
        res = self.__db.selectData(querySelect, queryTable)
        return res

    def __getKRStockDaily(self, tickerList, _from = None, _to= None):
        if _to == None:
            _to = str(datetime.today().strftime("%Y%m%d"))
        if _from == None:
            before30Day = datetime.today() - timedelta(30)
            _from = str(before30Day.strftime("%Y%m%d"))

        df = []
        if type(tickerList) is list:
            i = 0
            for name, ticker in tickerList:
                df.append(stock.get_market_ohlcv_by_date(_from, _to, ticker))
                i = i + 1
                self.__printPercent(len(tickerList), i)
                #print(len(df))
        else:
            df.append(stock.get_market_ohlcv_by_date(_from, _to, tickerList))
        return df
    
    def __sendKRStockDaily(self, tickers, datas):
        res = []
        print(len(tickers), len(datas))
        for i in range(0,len(datas)):
            flag = 0
            self.__printPercent(len(datas), i)
            for idx, row in datas[i].iterrows():
                stockdate = str(idx.date()).replace("-","")
                openprice = str(row[0])
                highprice = str(row[1])
                lowprice = str(row[2])
                closeprice = str(row[3])
                tradingvolume = str(row[4])


                
                querySelect = "*"
                queryTable = "DAILY_STOCK"
                queryWhere = "\"DATE\" =\'"+str(stockdate)+"\'and \"STOCK_CODE\" = \'"+str(tickers[i][1])+"\'"

                if len(self.__db.selectData(querySelect,queryTable,queryWhere)) == 0:
                    #self.__db.insertIntoDataToTable()

                    queryTable = "DAILY_STOCK(\"DATE\", \"STOCK_CODE\", \"OPEN\", \"HIGH\", \"LOW\", \"CLOSE\", \"TRADING_VOLUMN\", \
\"DAY_S_RANGE\", \"_3_DAY_MOVING_AVERAGE\", \"_5_DAY_MOVING_AVERAGE\", \"_10_DAY_MOVING_AVERAGE\", \"_20_DAY_MOVING_AVERAGE\"   \
, \"_60_DAY_MOVING_AVERAGE\", \"_3_DAY_TRADING_AVERAGE\", \"_5_DAY_TRADING_AVERAGE\", \"_10_DAY_TRADING_AVERAGE\", \"_20_DAY_TRADING_AVERAGE\", \
\"_60_DAY_TRADING_AVERAGE\", \"DATE_ORDER_BY_ITEM\", \"TRADING_VALUE\") "
                    queryValue = "(\'"+str(stockdate)+"\',\'"+str(tickers[i][1])+"\',"+openprice+","+highprice+","+lowprice+","+closeprice+","+tradingvolume+",0,0,0,0,0,0,0,0,0,0,0,0,0)"
                    #self.__db.insertIntoDataToTable_print(queryTable,queryValue)
                    self.__db.insertIntoDataToTable(queryTable,queryValue)

                    if flag == 0:
                        res.append(tickers[i][0])
                        flag = 1
        return res


    def setDBAllDailyStock(self):
        tickers = self.__getAllTickerFromDB()
        dailyDatas = self.__getKRStockDaily(tickers)
        info = self.__sendKRStockDaily(tickers,dailyDatas)
        print(info)
        return "123"
    
    def setDBAllStock(self):
        test = self.__getKRStockCodeAll()
        info = self.__sendKRStockCodeAll(test)
        return info



if __name__ == "__main__":
    data = CPricePykrx()
    test = data.setDBAllStock()
    print(test)
    


    