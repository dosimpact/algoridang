from flask import Flask, render_template, request, jsonify
from flask_restx import Resource, Api

from pycelery import processor, state
from flask_cors import CORS

from route.routeCelery import Celerys
from route.routeBacktest import BackTest
from route.routeDailyStock import DailyStock
from route.routeMiniBacktest import MiniBacktest
from route.routeQuant import Quant

from DB.connectionPool import databasepool
import sentry_sdk

# sentry
from sentry_sdk.integrations.flask import FlaskIntegration


sentry_sdk.init(
    dsn="https://9bcc130b93a649fb946adf4123664575@o986272.ingest.sentry.io/5942901",
    integrations=[FlaskIntegration()],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0
)
##  /sentry



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
api.add_namespace(MiniBacktest, '/minibacktest')
api.add_namespace(Celerys, '/celery')
api.add_namespace(DailyStock, '/datas')
api.add_namespace(Quant, '/quant')


dbinit = databasepool(0)
if __name__ == "__main__":
    #app.run(host='0.0.0.0', port=5000)
    processor.Test___backtestTestCode(2746)