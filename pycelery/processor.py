# processor.py
# from celery import Celery
import time
import os
from pprint import pformat
import celery 

from app import app



from os.path import join, dirname



from backtesting import backtesting
from openAPI import pricePykrx

from backtesting.MiniBacktest import MiniBacktest
from backtesting.MakeMiniBackTest import MakeMiniBackTest

# celery -A pycelery.processor.process worker --loglevel=info
# celery -A pycelery.processor.process worker --loglevel=info --autoscale=3,3
# 윈도우 환경에서는 다음 셋팅을 해야 인수전달이 제대로 된다.
# in window env Error, https://github.com/celery/celery/pull/4078
from sys import platform
if platform == "linux" or platform == "linux2":
    print("linux")
#elif platform == "darwin":
    # OS X
elif platform == "win32":
    os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')
    print("Windows")




# celery 설정 및 인스턴스
# BROKER_URL = 'redis://:dosimpact@133.186.229.72:6379/0'
# CELERY_RESULT_BACKEND = 'redis://dosimpact@133.186.229.72:6379/0'
process = celery.Celery('tasks')
process.config_from_object('celeryconfig')

class CoreTask(celery.Task):
    def on_failure(self, exc, task_id, args, kwargs, einfo):
        print(f'{task_id} on_failure: {exc}')

    def on_success(self, retval, task_id, args, kwargs):
        print(f'{task_id} on_success')

    def on_retry(self, exc, task_id, args, kwargs, einfo):
        print(f'{task_id} on_retry: {exc}')


# bind 옵션을 통해 self, 를 사용
# base 옵션을 통해 onEvent를 처리
@process.task(bind=True, base=CoreTask)
def add(self, x, y):
    with app.app_context():
        total = 30
        for idx in range(total):
            time.sleep(1)
            print(f"progress ({idx}/{total})")
            # 현재 작업중인 task를 업데이트, update_state
            self.update_state(state='PROGRESS', meta={
                'current': idx, 'total': total})
        # 현재 작업중인 id
        print(f"done task {self.request.id}")
        return x + y




@process.task(bind=True, base=CoreTask)
def initDB_Corporation(self):
    with app.app_context():
        res = ""

        pykrx = pricePykrx.CPricePykrx()
        tickers = pykrx.getKRStockCodeAll()

        total = len(tickers)
        for idx in range(total):
            
            print(f"progress ({idx}/{total})")
            
            res += pykrx.sendKRStockCodeAll(tickers[idx])
            self.update_state(state='PROGRESS', meta={'current': idx, 'total': total})
        
        print("Done")
        return res

@process.task(bind=True, base=CoreTask)
def initDB_DailyStock_queue(self,tickers,startDate):
    with app.app_context():
        idx = 0
        #print(tickers)
        pykrx = pricePykrx.CPricePykrx()
        updateData = []
        total = len(tickers)
        print(total)
        for ticker,name in tickers:
            idx += 1
            df = pykrx.getKRStockDaily(ticker,startDate)
            res = pykrx.sendKRStockDaily(ticker,df)

            if res != "":
                updateData.append((ticker,name))
            
            print(f"progress ({idx}/{total})")
            self.update_state(state='PROGRESS', meta={'current': idx, 'total': total})
            #break
        return updateData


@process.task(bind=True, base=CoreTask)
def backtestTaskCall(self,strategyCode):
    
    bk = backtesting.CBackTtrader(self.request.id, strategyCode)
    res = bk.requestBacktestOneStock()
    return res



def callMiniBacktest(miniBackData):
    adapter = MakeMiniBackTest()
    return (adapter.minibacktest(miniBackData))


    
def Test___backtestTestCode(id,strategyCode):
    bk = backtesting.CBackTtrader(None,strategyCode)
    res = bk.requestBacktestOneStock()
    return res