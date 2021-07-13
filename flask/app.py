from flask import Flask, render_template, request
from crawling.DB import DB
from crawling.pricePykrx import CPricePykrx

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(host ='0.0.0.0',port = 3000)