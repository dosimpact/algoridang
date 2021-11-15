from openAPI import pricePykrx
from financial.financialInformation import financialInformation
import time
from backtesting.MockInvestCtrl import MockInvestCtrl
# cron
from apscheduler.schedulers.background import BackgroundScheduler    # apscheduler 라이브러리 선언

from backtesting.BacktestMini import BacktestMini
from DB.RedisConnectionPool import RedisConnectionPool
import json


import logging
import threading
def callDaily():
    
    rdb = RedisConnectionPool()
    
    rdb.flush()
    print(f'job : {time.strftime("%H:%M:%S")}')
    pykrx = pricePykrx.CPricePykrx()
    tickers = pykrx.getAllTickerFromDB()
    fin = financialInformation()
    mock = MockInvestCtrl()
    print("dailyCorporation END : ", dailyCorporation())
    print("dailyStockData END : ", dailyStockData(tickers))
    #print("dailyfinanceData END : ", fin.getFinancalDataNaver(tickers))
    print("dailyfinanceData END : ", mock.searchMockInvest())
    print("miniBacktest End : ",  makeThread(tickers,rdb))

    print(f'job : {time.strftime("%H:%M:%S")}')


def MiniBacktest3Yeardata(tickers, db):
    """3년치 데이터 수행용 cronjob 함수 추후 멀티 스레드로 변경 필요
    @params
        tickers - ticker 묶음

    @return 
        res - 'Done'
    """
    
    for ticker , cropName in tickers:
        
        print("Sub-Thread  ", ticker)
        btm = BacktestMini()
        res1 = btm.getMiniBacktest3YearData(ticker, 'GoldenCross')
        res2 = btm.getMiniBacktest3YearData(ticker, 'RSI')
        res3 = btm.getMiniBacktest3YearData(ticker, 'BollingerBand')
        res4 = btm.getMiniBacktest3YearData(ticker, 'MACD')
        

        res = db.setRedisData(ticker, json.dumps({
                'GoldenCross' : res1,
                'RSI' : res2,
                'BollingerBand' : res3,
                'MACD' : res4
            }))

        if res == False:
            print(ticker," redis db error false")
            break

        print("Sub-Thread result ", db.getRedisData(ticker))


def makeThread(tickers,dbcon):

    logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

    tickerNum = len(tickers)
    x1 = threading.Thread(target=MiniBacktest3Yeardata, args=(tickers[int(tickerNum/5*0):int(tickerNum/5*1)], dbcon), daemon=True)
    x2 = threading.Thread(target=MiniBacktest3Yeardata, args=(tickers[int(tickerNum/5*1):int(tickerNum/5*2)], dbcon), daemon=True)
    x3 = threading.Thread(target=MiniBacktest3Yeardata, args=(tickers[int(tickerNum/5*2):int(tickerNum/5*3)], dbcon), daemon=True)
    x4 = threading.Thread(target=MiniBacktest3Yeardata, args=(tickers[int(tickerNum/5*3):int(tickerNum/5*4)], dbcon), daemon=True)
    x5 = threading.Thread(target=MiniBacktest3Yeardata, args=(tickers[int(tickerNum/5*4):int(tickerNum/5*5)], dbcon), daemon=True)
    
    x1.start()
    x2.start()
    x3.start()
    x4.start()
    x5.start()
    
    x1.join()
    x2.join()
    x3.join()
    x4.join()
    x5.join()



def dailyCorporation():
    pykrx = pricePykrx.CPricePykrx()
    tickers = pykrx.getKRStockCodeAll()

    total = len(tickers)
    for idx in range(total):
        pykrx.sendKRStockCodeAll(tickers[idx])
        print(f"progress ({idx}/{total})")
    print("Done")


def dailyStockData(tickers):
    pykrx = pricePykrx.CPricePykrx()
    updateData = []
    total = len(tickers)
    print(total)
    idx = 0
    for ticker, name in tickers:
        idx += 1
        df = pykrx.getKRStockDaily(ticker)
        res = pykrx.sendKRStockDaily(ticker, df)

        if res != "":
            updateData.append((ticker, name))

        print(f"dailyStockData progress ({idx}/{total})")
    return updateData


def callDailyFunction():
    # apscheduler 선언
    sched = BackgroundScheduler(daemon=True)

    # apscheduler실행설정, Cron방식으로, 1주-53주간실행, 월요일부터일요일까지실행, 21시에실행
    # sched.add_job(callDaily, 'cron', day_of_week='0-4', hour='0', minute='30')

    # test
    sched.add_job(callDaily, 'cron', day_of_week='0-4', hour='00', minute='30')

    # apscheduler실행
    sched.start()
    
    callDaily()
    
    while 1:
        pass


