from pykrx import stock
from .DB.DB import databasepool
from datetime import datetime, timedelta


class CPricePykrx(object):
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
        
        db = databasepool()
        conn = db.getConn()

        query = "select * from corporation where \"ticker\" = \'"+ticker+"\';"
        

        #없는경우 데이터 입력
        if len(db.selectData(conn, query)) == 0:
            query = "insert into corporation( \"ticker\", \"corp_name\") values(\'"+ticker+"\',\'"+name+"\')"
            db.insertIntoData(conn,query)
            conn.commit()
            db.putConn(conn)
            return " "+str(name)
        
        db.putConn(conn)
        return ""

    def getAllTickerFromDB(self):
        
        db = databasepool()
        conn = db.getConn()

        query = "select * from corporation "

        res = db.selectData(conn, query)

        db.putConn(conn)
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
        res = []

        db = databasepool()
        conn = db.getConn()

        for idx, row in datas.iterrows():
            #stockdate = str(idx.date()).replace("-","")
            stockdate = str(idx.date()) + "T15:30:00+09:00"
            openprice = str(row[0])
            highprice = str(row[1])
            lowprice = str(row[2])
            closeprice = str(row[3])
            tradingvolume = str(row[4])


            query = "select * from daily_stock where \"stock_date\" =\'"+str(stockdate)+"\'and \"ticker\" = \'"+str(ticker)+"\'"
            
            if len(db.selectData(conn,query)) == 0:
                
                query = "insert into daily_stock(\"stock_date\", \"ticker\", \"open_price\", \"high_price\", \"low_price\", \"close_price\", \"volume\") "
                query += "values(\'"+str(stockdate)+"\',\'"+str(ticker)+"\',"+openprice+","+highprice+","+lowprice+","+closeprice+","+tradingvolume+")"
                
                db.insertIntoData(conn,query)
                conn.commit()
                res.append(ticker)

        db.putConn(conn)
        return res



    


    