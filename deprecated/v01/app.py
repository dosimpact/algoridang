from flask import Flask, request, jsonify
from flask_cors import CORS
import state
import processor

app = Flask(__name__)
CORS(app)


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

    task = processor.add.apply_async([int(a), int(b)])

    if not task.id:
        return jsonify({"ok": False, "error": "celery is down"})

    return jsonify({"ok": True, "task_id": task.id})


@app.route("/check/<string:task_id>", methods=["GET"])
def checkQ_plus(task_id):
    print("task_id", task_id)
    res = state.get_add_progress(task_id)
    return jsonify({"ok": True, "task_id": task_id, "res": res})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
