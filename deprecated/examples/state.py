
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
