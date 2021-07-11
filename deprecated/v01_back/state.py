from time import sleep
# import processor
import app


def get_add_progress(task_id: str):
    task = app.add.AsyncResult(task_id)
    print(task, task.state)
    if task.state == 'PENDING':
        response = {'state': task.state, 'current': 0, 'total': 1}
    elif task.state == "SUCCESS":
        response = {'state': task.state, 'current': 1, 'total': 1}
    elif task.state != 'FAILURE':
        response = {'state': task.state, 'current': task.info.get(
            'current', 0), 'total': task.info.get('total', 1)}
    return (response)
