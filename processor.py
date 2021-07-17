# processor.py
# from celery import Celery
import time
import os
from pprint import pformat
import celery

from app import app


# 윈도우 환경에서는 다음 셋팅을 해야 인수전달이 제대로 된다.
# in window env Error, https://github.com/celery/celery/pull/4078
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')


# celery 설정 및 인스턴스
# BROKER_URL = 'redis://:dosimpact@133.186.229.72:6379/0'
# CELERY_RESULT_BACKEND = 'redis://dosimpact@133.186.229.72:6379/0'
process = celery.Celery('tasks')
process.config_from_object('celeryconfig')

# celery 실행 명령어
# celery -A processor.process worker --loglevel=info
# 최소 3개 ~ 10개의 워커가 작동
# celery -A processor.process worker --loglevel=info --autoscale=3,3


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
