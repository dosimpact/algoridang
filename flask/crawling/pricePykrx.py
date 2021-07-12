from pykrx import stock
from .DB.DB import psql

class CPricePykrx(object):
    
    __db = psql()
    __test = 0

    def __init__(self,test=0):
        self.__test = test

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


    def setDBAllStock(self):
        test = self.__getKRStockCodeAll()
        info = self.__sendKRStockCodeAll(test)
        return info


if __name__ == "__main__":
    data = CPricePykrx()
    test = data.setDBAllStock()
    print(test)
    


    