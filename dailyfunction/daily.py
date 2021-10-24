from openAPI import pricePykrx
from financial.financialInformation import financialInformation
import time
from backtesting.MockInvestCtrl import MockInvestCtrl
# cron
from apscheduler.schedulers.background import BackgroundScheduler    # apscheduler 라이브러리 선언

def callDaily():
    print(f'job : {time.strftime("%H:%M:%S")}')
    print("dailyCorporation END : ", dailyCorporation())
    pykrx = pricePykrx.CPricePykrx()
    tickers = pykrx.getAllTickerFromDB()
    fin = financialInformation()
    mock = MockInvestCtrl()
    print("dailyStockData END : ", dailyStockData(tickers))
    #print("dailyfinanceData END : ", fin.getFinancalDataNaver(tickers))
    print("dailyfinanceData END : ", mock.searchMockInvest())
    print(f'job : {time.strftime("%H:%M:%S")}')


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
        df = pykrx.getKRStockDaily(ticker,'20110101')
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
    while 1:
        pass
