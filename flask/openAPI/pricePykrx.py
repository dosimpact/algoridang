from pykrx import stock
from .DB.DB import psql
from datetime import datetime, timedelta


class CPricePykrx(object):
    
    __db = psql()
    __test = 0
    __state = 0
    def __init__(self,test=0):
        self.__test = test



    #모든 종목 리스트 가져오기
    def getKRStockCodeAll(self):
        stockList = stock.get_market_ticker_list(None,"ALL")
        return stockList
    
    #모든 종목리스트 전송
    def sendKRStockCodeAll(self,ticker):

        #데이터 유무 확인
        name = stock.get_market_ticker_name(ticker)
        queryWhere = "\"ticker\" = \'"+ticker+"\';"

        #없는경우 데이터 입력
        if len(self.__db.selectData("*","corporation",queryWhere)) == 0:
            queryTable = "corporation( \"ticker\", \"corp_name\")"
            queryValue = "(\'"+ticker+"\',\'"+name+"\')"
            self.__db.insertIntoDataToTable(queryTable,queryValue)
            return " "+str(name)
        return ""

    def getAllTickerFromDB(self):
        tickerList = []
        querySelect = "*"
        queryTable = "corporation"
        res = self.__db.selectData(querySelect, queryTable)
        return res

    def getKRStockDaily(self, ticker, _from = None, _to= None):
        if _to == None:
            _to = str(datetime.today().strftime("%Y%m%d"))
        if _from == None:
            before30Day = datetime.today() - timedelta(30)
            _from = str(before30Day.strftime("%Y%m%d"))

        df = stock.get_market_ohlcv_by_date(_from, _to, ticker)
        return df
    
    def sendKRStockDaily(self, ticker, datas):
        res = ""
        print(len(datas))
        for idx, row in datas.iterrows():
            #stockdate = str(idx.date()).replace("-","")
            stockdate = str(idx.date()) + "T15:30:00+09:00"
            openprice = str(row[0])
            highprice = str(row[1])
            lowprice = str(row[2])
            closeprice = str(row[3])
            tradingvolume = str(row[4])


            
            querySelect = "*"
            queryTable = "daily_stock"
            queryWhere = "\"stock_date\" =\'"+str(stockdate)+"\'and \"ticker\" = \'"+str(ticker)+"\'"

            if len(self.__db.selectData(querySelect,queryTable,queryWhere)) == 0:
                
                queryTable = "daily_stock(\"stock_date\", \"ticker\", \"open_price\", \"high_price\", \"low_price\", \"close_price\", \"volume\") "
                queryValue = "(\'"+str(stockdate)+"\',\'"+str(ticker)+"\',"+openprice+","+highprice+","+lowprice+","+closeprice+","+tradingvolume+")"
                self.__db.insertIntoDataToTable(queryTable,queryValue)
                res = ticker

        return res


    def setDBAllDailyStock(self):
        tickers = self.getAllTickerFromDB()
        dailyDatas = self.getKRStockDaily(tickers)
        info = self.sendKRStockDaily(tickers,dailyDatas)
        print(info)
        return "123"
    
    def setDBAllStock(self):
        test = self.getKRStockCodeAll()
        info = self.sendKRStockCodeAll(test)
        return info



if __name__ == "__main__":
    data = CPricePykrx()
    test = data.setDBAllStock()
    print(test)
    


    