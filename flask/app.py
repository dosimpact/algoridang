from flask import Flask, render_template, request, jsonify
from crawling.DB import DB
from crawling.pricePykrx import CPricePykrx

from celery import Celery

from time import sleep

app = Flask(__name__)
app.config.update(
    CELERY_BROKER_URL='redis://:dosimpact@133.186.229.72:6379/0',
    CELERY_RESULT_BACKEND='redis://:dosimpact@133.186.229.72:6379/0'
)




def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL'],
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


celery = make_celery(app)

task_cache = dict()

@celery.task()
def add_together(a, b):
    sleep(5)
    return a+b


# http://127.0.0.1:5000/adder?a=1&b=2
@app.route('/adder', methods=['GET'])
def adder():
    global task_cache
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    task = add_together.delay(a, b)
    task_cache[task.id] = task
    return task.id

@app.route('/progress', methods=['GET'])
def progress():
    global task_cache
    task_id = request.args.get('task_id')
    task = task_cache[task_id]
    return jsonify({
        'status': task.ready()
    })

@app.route('/result', methods=['GET'])
def result():
    global task_cache
    task_id = request.args.get('task_id')
    task = task_cache[task_id]
    return jsonify({
        'result': task.get()
    })



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