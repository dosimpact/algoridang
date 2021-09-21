from flask import request, jsonify
from flask_restx import Resource, Api, Namespace, fields


from pycelery import processor, state

Celerys = Namespace(
    name="Celery",
    description="Algoridang service Celery API",
)


celeryFields = Celerys.model('Celery', {  # Model 객체 생성
    'CeleryId': fields.String(description='a CeleryId ID', required=True),
})


celeryFieldsWithId = Celerys.inherit('Backtest With ID', celeryFields, {
    'data': fields.String(description='Backtest result', required=True, example="request backtest result"),
    'status' : fields.String(description='status', required=False, example="status")
})

@Celerys.route("/status/<string:task_id>")
@Celerys.doc(params={'task_id': 'task id'})
class Celerypost(Resource):
    @Celerys.expect(celeryFields)
    @Celerys.response(201, 'Success', celeryFieldsWithId)
    def get(self,task_id):
        """task_id 를 바탕으로 celery 동작 여부를 확인합니다. """

        print("task_id", task_id)
        res = state.get_add_progress(task_id)
           
       
        return {
            'CeleryId': task_id,
            'data': res,
            'status' : "done"
        }, 201



@Celerys.route("/test/plus")
@Celerys.doc(params={
    'a': 'integer',
    'b': 'integer'
    })
class Celerypost(Resource):
    @Celerys.expect(celeryFields)
    @Celerys.response(201, 'Success', celeryFieldsWithId)
    def get(self):
        
        a = request.args.get('a')
        b = request.args.get('b')
        """task_id 를 바탕으로 celery 동작 여부를 확인합니다. """

        if not a or not b:
            return {
                'status' : "error : Some required data is missing!"
            }, 400

        task = processor.add.apply_async([int(a), int(b)])

        if not task.id:
            return {
                'status' : "error : Celery Server is down"
            }, 503

        return {
            'CeleryId': "a = "+str(a)+"  b = "+str(b),
            'data': "[ "+str(task.id) +" ]  Request Celery Server ",
            'status' : "done"
        }, 201



