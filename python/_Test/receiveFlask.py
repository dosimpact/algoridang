from flask import Flask     # Flask 라이브러리 선언
from flask import request    
import time                          
from apscheduler.schedulers.background import BackgroundScheduler    # apscheduler 라이브러리 선언

app = Flask(__name__)

@app.route('/', methods=['POST'])
def hello_world():
    return 'Hello World!'

def function123():
    print(f'job1 : {time.strftime("%H:%M:%S")}')

# apscheduler 선언
sched = BackgroundScheduler(daemon=True)

# apscheduler실행설정, Cron방식으로, 1주-53주간실행, 월요일부터일요일까지실행, 21시에실행
sched.add_job(function123, 'cron', day_of_week='0-6', hour='0-23', second='0-59' )

# apscheduler실행
sched.start()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)