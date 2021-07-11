# python + flask + celery

## ✔

## 01 base

- 1. redis 설치하기
- 2. pip install celery, pip install redis 설치하기

- 3.1 celeryconfig.py 작성
- 설정 파일이다.

- 바로 접속하기
- 'redis://133.186.xxx.00:6379/0'

- 비번만 있는 경우
- 'redis://:dosimpact@133.186.xxx.00:6379/0'

```py
broker_url = 'redis://:dosimpact@xxx.xxx.xxx.72:6379/0'
result_backend = 'redis://:dosimpact@xxx.xxx.xxx.72:6379/0'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Asia/Seoul'
enable_utc = True

# # 오작동 한 작업을 전용 대기열로 라우팅하는 설정
# task_routes = {
#     'tasks.add': 'low-priority'
# }

# # 작업 속도를 제한하는 설정
# task_annotations = {
#     'tasks.add': {'rate_limit': '10/m'
# }

```

- 3.2 processor.py 작성
- 긴 작업이 걸리는 entry points
- window10 에서는 애러가 나서 os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1') 추가

```py
# processor.py
from celery import Celery
import time
import os

# in window env Error, https://github.com/celery/celery/pull/4078
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')
# dosimpact
# BROKER_URL = 'redis://:dosimpact@133.186.xxx.00:6379/0'
# CELERY_RESULT_BACKEND = 'redis://dosimpact@133.186.xxx.00:6379/0'
celery = Celery('tasks')
celery.config_from_object('celeryconfig')


# celery -A processor worker --loglevel=info


@celery.task
def add( x, y):
    return x + y

```

- 3.3 작업을 주는 pub.py 작성
- celery의 데코레이터가 붙은 함수는 delay를 가지고 이를 호출하여 작업 큐에 넣는다.
- 반환은 resultAsync 객체이고, ready()를 통해 id가 발급되고
- id로 작업여부를 확인 가능

```py
from processor import add
from time import sleep
# task pub
for i in range(1):
    result = add.delay(1, 2)
    print(f"result : {result} {result.ready()}")
```

## 02 state check, event

🚀 python + celery + redis MSA 스택

✔ 큐에 작업을 주기  
✔ 특정 큐 id의 현재의 작업 상태는 ?  
✔ 특정 큐 id의 작업 끝나면 말해줘 ( celery workers -> evernts )

---

- 1. redis 설치
- 도커를 통해서 설치 했다.
- password가 포함된 url는 다음과 같다.
- 'redis://:dosimpact@133.186.xxx.00:6379/0'

- 2. pip install redis, pip install celery
- celery 는 설치 경로에 exe 파일이 있다.

- 3. celeryconfig.py
- redis를 메시지 브로커 백앤드로 사용한다.

```py
broker_url = 'redis://:dosimpact@133.186.229.72:6379/0'
result_backend = 'redis://:dosimpact@133.186.229.72:6379/0'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Asia/Seoul'
enable_utc = True

# # 오작동 한 작업을 전용 대기열로 라우팅하는 설정
# task_routes = {
#     'tasks.add': 'low-priority'
# }

# # 작업 속도를 제한하는 설정
# task_annotations = {
#     'tasks.add': {'rate_limit': '10/m'
# }
```

- 4. processor.py
- 작업큐를 받는 시작점이다.
- celery 클라이언트라고도 볼 수 있다.

```py
# processor.py
# from celery import Celery
import celery
from celery.events.snapshot import Polaroid
import time
import os
from pprint import pformat

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
    total = 3
    for idx in range(total):
        time.sleep(1)
        print(f"progress ({idx}/{total})")
        # 현재 작업중인 task를 업데이트, update_state
        self.update_state(state='PROGRESS', meta={
                          'current': idx, 'total': total})

    # 현재 작업중인 id
    print(f"done task {self.request.id}")
    return x + y

```

- 5. pub.py
- 작업큐를 주는 곳
- flask와 연결이 된다.

```py
from processor import add
from time import sleep


# task pub
for i in range(1):
    result = add.apply_async([1, 2])
    print(f"result : {result} {result.ready()}")

# result = add.apply_async([(2, 2), (3, 3), (4, 4)])
# print(f"result : {result.ready()}")

```

- 6. state.py
- 작업id를 통해서 현재 진행 중인 작업을 관찰

```py

from processor import add
from time import sleep


def get_progress(task_id: str):
    task = add.AsyncResult(task_id)
    print(task, task.state)
    if task.state == 'PENDING':
        response = {'state': task.state, 'current': 0, 'total': 1}
    elif task.state == "SUCCESS":
        response = {'state': task.state, 'current': 1, 'total': 1}
    elif task.state != 'FAILURE':
        response = {'state': task.state, 'current': task.info.get(
            'current', 0), 'total': task.info.get('total', 1)}
    return (response)


res = get_progress("ee900e77-896f-48d6-beb8-8b5d5633a2b2")
print(res)

```

### Ref

[https://core-research-team.github.io/2020-03-01/Celery-Flask-30e28a8974974f6cb55ed0c07d042671](https://core-research-team.github.io/2020-03-01/Celery-Flask-30e28a8974974f6cb55ed0c07d042671)

[https://heodolf.tistory.com/73](https://heodolf.tistory.com/73)

[https://docs.celeryproject.org/en/stable/userguide/tasks.html#task-result-backends](https://docs.celeryproject.org/en/stable/userguide/tasks.html#task-result-backends)

## 03 python + flask + celery

```

```
