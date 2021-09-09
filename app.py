from flask import Flask, render_template, request, jsonify
from flask_restx import Resource, Api

from pycelery import processor, state
from flask_cors import CORS

from route.routeCelery import Celerys
from route.routeBacktest import BackTest
from route.routeDailyStock import DailyStock


app = Flask(__name__)

CORS(app)

api = Api(
    app,
    version='0.1',
    title="Algoridang's API Server",
    description="Algoridang API Server!",
    terms_url="/",
    contact="blue_rose17@naver.com",
    license="팔쩜팔"
)

api.add_namespace(BackTest, '/backtest')
api.add_namespace(Celerys, '/celery')
api.add_namespace(DailyStock, '/datas')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
    #print(processor.Test___backtestTestCode(None, 2583))