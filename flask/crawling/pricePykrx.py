from pykrx import stock
from DB.DB import psql

class pricePykrx(object):
    

    def getKrStockCodeAll(self):
        #"KOSPI" , "KOSDAQ"
        cnt = 0
        print(type(stock.get_market_ticker_list(None,"ALL")))
        print((stock.get_market_ticker_list(None,"ALL")))
        """
        for ticker in stock.get_market_ticker_list(None,"ALL"):
            data = stock.get_market_ticker_name(ticker)
            print(data, ticker, sep = " = " ,end= "\n")
            cnt= cnt +1
        """
        print(cnt)


    def getDataTest(self,nuberofstock = 10):
        cnt = nuberofstock
        tickers = stock.get_market_ticker_list("20210706")

        for ticker in stock.get_market_ticker_list():
            if cnt <=0:
                break
            cnt = cnt - 1

            data = stock.get_market_ticker_name(ticker)
            print(data)

            """
            if SQL_Is_Data_In_STOCK(cursor,ticker) == 0 :
                cursor.execute(Make_Insert_Into_STOCK(ticker, data))
                connection.commit()
            """


            #cursor.execute(Maker_Insert_Into_STOCK(ticker,data))
            #rows = cursor.fetchall() 
            #conn.commit()
        
            df = stock.get_market_ohlcv_by_date("20210706", "20210707", ticker)

            for idx, row in df.iterrows():
                stockdate = str(idx.date())
                print(stockdate)
                openprice = str(row[0])
                highprice = str(row[1])
                lowprice = str(row[2])
                endprice = str(row[3])
                tradingvolume = str(row[4])

                print(openprice,highprice,lowprice,endprice,tradingvolume, sep= "  ")
                """
                if SQL_Is_Data_In_DAILY_STOCK(cursor,ticker,stockdate) == 0:
                    cursor.execute(Make_Insert_Into_DAILY_STOCK(stockdate,ticker,openprice,highprice,lowprice,endprice,tradingvolume))
                    connection.commit()
                """

                print("------"*5)
            #sleep(1000)


if __name__ == "__main__":
    data = pricePykrx()
    data.getKrStockCodeAll()
    db = psql()
    


    