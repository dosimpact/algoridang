from flask import Flask, render_template, request, jsonify
from openAPI.DB import DB
from openAPI.pricePykrx import CPricePykrx

from pycelery import processor, state
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



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


@app.route("/check/<string:task_id>", methods=["GET"])
def checkQ_plus(task_id):
    print("task_id", task_id)
    res = state.get_add_progress(task_id)
    return jsonify({"ok": True, "task_id": task_id, "res": res})


@app.route("/")
def hello():
	return "This is the main page"

@app.route("/SetDBStockCodeAll")
def SetDBStockCodeAll():
    data = CPricePykrx()
    test = data.setDBAllStock()
    return str(test)

@app.route("/DBinit")
def DBinit():
    return DB.initDB()

@app.route("/DBdisconection")
def DBdisconection():
    db = DB.psql()
    return db.getDBStatus()

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
        data["ticker"] = request.form["ticker"]
        data["startTime"] = request.form["startTime"]
        data["endTime"] = request.form["endTime"]
        data["strategyCode"] = request.form["strategyCode"]
        data["investPrice"] = request.form["investPrice"]
        data["tradingStrategyCode"] = request.form["tradingStrategyCode"]
        data["tradingStrategyDetailSettingCode"] = request.form["tradingStrategyDetailSettingCode"]

        if not data["ticker"] or not data["strategyCode"] or not data["investPrice"] or not data["tradingStrategyCode"] or not data["tradingStrategyDetailSettingCode"]:
            return  jsonify({"ok": False, "error": "some required data is missing!"})
        if not data["startTime"]:
            data["startTime"] = "20110101"
        
        task = processor.backtestTaskCall.apply_async([data])

        if not task.id:
            return jsonify({"ok": False, "error": "celery is down"})

        return jsonify({"ok": True, "task_id": task.id})

        
if __name__ == "__main__":
    #app.run(host ='0.0.0.0',port = 3000)

    print ("testcode")
    processor.backtestTestCode()