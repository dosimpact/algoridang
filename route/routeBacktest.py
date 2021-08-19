from flask import request, jsonify
from flask_restx import Resource, Api, Namespace, fields


from pycelery import processor
todos = {}
count = 1


BackTest = Namespace(
    name="Backtest",
    description="Algoridang service Backetst API",
)


backTestFields = BackTest.model('Backtest', {  # Model 객체 생성
    'BacktestId': fields.String(description='a Backtest ID', required=True),
})


backTestFieldsWithId = BackTest.inherit('Backtest With ID', backTestFields, {
    'data': fields.String(description='Backtest result', required=True, example="request backtest result"),
    'status' : fields.String(description='status', required=False, example="status")
})

@BackTest.route('')
@BackTest.doc(params={'strategyCode': 'Database strategyCode'})
class BackTestPost(Resource):
    @BackTest.expect(backTestFields)
    @BackTest.response(201, 'Success', backTestFieldsWithId)
    def post(self):
        """strategyCode 를 바탕으로 백테스트를 수행합니다. """
        if request.method == 'POST':
            inputdata = request.get_json(silent=True)
            strategyCode = inputdata["strategyCode"]
            if not strategyCode or  strategyCode == '':
                
                return {
                    'status' : "error : Some required data is missing!"
                }, 400
            task = processor.backtestTaskCall.apply_async([strategyCode])
           
            if not task.id:
                return {
                    'status' : "error : Celery Server is down"
                }, 503

            

        
        return {
            'BacktestId': strategyCode,
            'data': "[ "+str(task.id) +" ]  Request Celery Server ",
            'status' : "done"
        }, 201



