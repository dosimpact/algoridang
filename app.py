from flask import Flask, render_template, request, jsonify

from openAPI.pricePykrx import CPricePykrx

from pycelery import processor, state
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route("/check/<string:task_id>", methods=["GET"])
def checkQ_plus(task_id):
    print("task_id", task_id)
    res = state.get_add_progress(task_id)
    return jsonify({"ok": True, "task_id": task_id, "res": res})


@app.route("/plus", methods=["GET"])
def pushQ_plus():
    a = request.args.get('a')
    b = request.args.get('b')
    if not a or not b:
        return jsonify({"ok": False, "error": "query string a,b is required"})

    task = processor.add.apply_async([int(a), int(b)])

    if not task.id:
        return jsonify({"ok": False, "error": "celery is down"})

    return jsonify({"ok": True, "task_id": task.id})



@app.route("/")
def hello():
	return "This is the main page"

@app.route("/user",methods=['GET', 'POST'])
def post():
    if(request.method =='GET'):
        return render_template('input.html')

    elif(request.method == 'POST'):
        value = request.form['input']
        return render_template('default.html', name=value)







######################backtest
@app.route("/backtest", methods=["GET","POST"])
def backTestAPI():
    data = {}
    if request.method == 'POST':
        inputdata = request.get_json(silent=True)
        strategyCode = inputdata["strategyCode"]
        if not strategyCode or  strategyCode == '':
            return  jsonify({"ok": False, "error": "some required data is missing!"})
        task = processor.backtestTaskCall.apply_async([strategyCode])

        if not task.id:
            return jsonify({"ok": False, "error": "celery is down"})

        return jsonify({"ok": True, "task_id": task.id})

    
################initialization
@app.route("/DBinit/Corporation", methods=["GET"])
def DBinitCrop():
    task = processor.initDB_Corporation.apply_async()

    if not task.id:
        return jsonify({"ok": False, "error": "celery is down"})

    return jsonify({"ok": True, "task_id": task.id})


@app.route("/DBinit/Daily_stock", methods=["GET"])
def DBinitDailyStock():
    task = processor.initDB_DailyStock.apply_async()

    if not task.id:
        return jsonify({"ok": False, "error": "celery is down"})

    return jsonify({"ok": True, "task_id": task.id})


#4개 queue 를 통한 데이터 입력 
@app.route("/DBinit/Daily-stock/thread", methods=["GET"])
def DBinitDailyStockMulti():
    
    if(request.method =='GET'):
        worker = request.args.get('worker')
        worker = int(worker)
        pykrx = CPricePykrx()
        tickers = pykrx.getAllTickerFromDB()
        length = int(len(tickers)/worker) + 1
        #print(tickers)
        tasks= []
        for i in range(worker):
            if length*(i+1) > len(tickers):
                task = processor.initDB_DailyStock_queue.apply_async([tickers[length*i:]])
            else:
                task = processor.initDB_DailyStock_queue.apply_async([tickers[length*i:length*(i+1)]])
            tasks.append(task.id)

            if not task.id:
                return jsonify({"ok": False, "error": "celery is down"})

        return jsonify({"ok": True, "task_id": tasks})

    return jsonify("need GET request")


if __name__ == "__main__":
    app.run(host ='0.0.0.0',port = 5000)
    #print(processor.Test___backtestTestCode(1))

    
