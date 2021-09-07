from flask import request, jsonify
from flask_restx import Resource, Api, Namespace, fields


from openAPI.pricePykrx import CPricePykrx
from pycelery import processor

DailyStock = Namespace(
    name="DailyStock",
    description="Algoridang service stock API",
)


DailyStockFields = DailyStock.model('Backtest', {  # Model 객체 생성
    'worker': fields.Integer(description='worker', required=True),
    'startdate': fields.String(description='startdate', required=False, example="20110101")
})


DailyStockFieldsWithId = DailyStock.inherit('Backtest With ID', DailyStockFields, {
    'data': fields.String(description='celery id result', required=True, example="celery id"),
    'status' : fields.String(description='status', required=False, example="done")
})


@DailyStock.route("/Daily-stock")
@DailyStock.doc(params={
    'worker': '0 < integer <= 10',
    'startdate': '20110101'
    })
class DBinitDailyStockMulti(Resource):
    @DailyStock.expect(DailyStockFields)
    @DailyStock.response(201, 'Success', DailyStockFieldsWithId)
    def get(self):
        """일간 데이터를 가져옵니다."""

        worker = request.args.get('worker')
        startDate = request.args.get('startdate')
        if worker is None:
            return {
                'status' : "error :  data is missing!"
            }, 400

        if startDate == None:
            startDate = '20110101'

        worker = int(worker)

        if worker < 1 and worker >10:
            return {
                'status' : "error : woker required data is wrong!"
            }, 400

        pykrx = CPricePykrx()
        tickers = pykrx.getAllTickerFromDB()
        length = int(len(tickers)/worker) + 1
        tasks= []
        for i in range(worker):
            if length*(i+1) > len(tickers):
                task = processor.initDB_DailyStock_queue.apply_async([tickers[length*i:],startDate])
            else:
                task = processor.initDB_DailyStock_queue.apply_async([tickers[length*i:length*(i+1)],startDate])
            tasks.append(task.id)

            if not task.id:
                return {
                    'status' : "error : Celery Server is down"
                }, 503
       
        return {
            'worker': str(worker),
            'data': str(tasks),
            'status' : "done"
        }, 201



@DailyStock.route("/Corporation")
class Corporation(Resource):
    @DailyStock.expect(DailyStockFields)
    @DailyStock.response(201, 'Success', DailyStockFieldsWithId)
    def get(self):
        """오늘 거래가 이루진 회사의 tiker 정보를 가져옵니다."""

        task = processor.initDB_Corporation.apply_async()

        if not task.id:
            return {
                'status' : "error : Celery Server is down"
            }, 503

        return {
            'CeleryId': "Corporation",
            'data': "[ "+str(task.id) +" ]  Request Celery Server ",
            'status' : "done"
        }, 201

