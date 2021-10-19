from flask import request, jsonify
from flask_restx import Resource, Api, Namespace, fields
from backtesting.BacktestMini import BacktestMini


from pycelery import processor

MiniBacktest = Namespace(
    name="MiniBacktest",
    description="simple backtest",
)


MiniFields = MiniBacktest.model('MiniBacktest', {  # Model 객체 생성
    'ticker': fields.Integer(description='ticker', required=True, example='005930'),
    'salestrategy': fields.Integer(description='salestrategy', required=True, example="GoldenCross"),
    'setting': fields.Integer(description='setting', required=True, example= [5,20]),
    'data': fields.Integer(description='startTime,endTime ', required=True, example={"startTime": "20190101","endTime": ""}
    )
})



MiniFieldsRes = MiniBacktest.inherit('MiniBackTest Response', {  
    'code': fields.Integer(description='code', required=True, example='005930'),
    'res': fields.Integer(description='res', required=True, example={
        "profit_rate": 1.439577,
        "year_avg_profit_rate": 0.14,
        "mdd": -0.27
    })
    
})

@MiniBacktest.route('/minibacktest')
class MiniBackTest(Resource):
    @MiniBacktest.expect(MiniFields)
    @MiniBacktest.response(201, 'Success',MiniFieldsRes)
    def post(self):
        """strategyCode 를 바탕으로 백테스트를 수행합니다. """
        if request.method == 'POST':
            inputdata = request.get_json(silent=True)
            bt = BacktestMini()
            
            res = bt.getMiniBacktest(inputdata)
           
        return res, 201



