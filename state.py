from time import sleep
import processor


def get_add_progress(task_id: str):
    task = processor.add.AsyncResult(task_id)
    print(task, task.state)
    if task.state == 'PENDING':
        response = {'state': task.state, 'current': 0, 'total': 1}
    elif task.state == "SUCCESS":
        response = {'state': task.state, 'current': 1, 'total': 1}
    elif task.state == "PROGRESS":
        response = {'state': task.state, 'current': task.info.get(
            'current', 0), 'total': task.info.get('total', 1)}
    else:
        response = {'state': task.state, 'current': task.info.get(
            'current', 0), 'total': task.info.get('total', 1)}
    return (response)
