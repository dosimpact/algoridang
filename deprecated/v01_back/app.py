import state
# import processor
import time
import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from pprint import pformat
import celery

app = Flask(__name__)
CORS(app)


# 윈도우 환경에서는 다음 셋팅을 해야 인수전달이 제대로 된다.
# in window env Error, https://github.com/celery/celery/pull/4078
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')


# celery 설정 및 인스턴스
# BROKER_URL = 'redis://:dosimpact@133.186.229.72:6379/0'
# CELERY_RESULT_BACKEND = 'redis://dosimpact@133.186.229.72:6379/0'
process = celery.Celery('tasks')
process.config_from_object('celeryconfig')

# celery 실행 명령어
# celery -A processor worker --loglevel=info
# 최소 3개 ~ 10개의 워커가 작동
# celery -A processor worker --loglevel=info --autoscale=3,3


# celery 이벤트 실행시 기본 함수
# Event-driven


class CoreTask(celery.Task):
    def on_failure(self, exc, task_id, args, kwargs, einfo):
        print(f'{task_id} on_failure: {exc}')

    def on_success(self, retval, task_id, args, kwargs):
        print(f'{task_id} on_success')

    def on_retry(self, exc, task_id, args, kwargs, einfo):
        print(f'{task_id} on_retry: {exc}')


# bind 옵션을 통해 self, 를 사용
# base 옵션을 통해 onEvent를 처리
@process.task(bind=True, base=CoreTask)
def add(self, x, y):
    with app.app_context():
        total = 30
        for idx in range(total):
            time.sleep(1)
            print(f"progress ({idx}/{total})")
            # 현재 작업중인 task를 업데이트, update_state
            self.update_state(state='PROGRESS', meta={
                'current': idx, 'total': total})
        # 현재 작업중인 id
        print(f"done task {self.request.id}")
        return x + y


@app.route("/")
def hello_world():
    return jsonify({"hello_world": True})


# http://127.0.0.1:5000/plus?a=1&b=2
@app.route("/plus", methods=["GET"])
def pushQ_plus():
    a = request.args.get('a')
    b = request.args.get('b')
    if not a or not b:
        return jsonify({"ok": False, "error": "query string a,b is required"})

    # task = add.apply_async([1, 2])
    task = add.delay(1, 2)

    if not task.id:
        return jsonify({"ok": False, "error": "celery is down"})

    return jsonify({"ok": True, "task_id": task.id})


@app.route("/check/<string:task_id>", methods=["GET"])
def checkQ_plus(task_id):
    print("task_id", task_id)
    res = state.get_add_progress(task_id)
    return jsonify({"ok": True, "task_id": task_id, "res": res})


@app.route("/check_add/<string:task_id>", methods=["GET"])
def get_add_progress(task_id: str):
    response = {}
    task = add.AsyncResult(task_id)
    print(task, task.state)
    if task.state == 'PENDING':
        response = {'state': task.state, 'current': 0, 'total': 1}
    elif task.state == "SUCCESS":
        response = {'state': task.state, 'current': 1, 'total': 1}
    elif task.state == 'FAILURE':
        response = {'state': task.state, 'current': 0, 'total': 1}
    return (response)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
