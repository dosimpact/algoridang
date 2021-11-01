#!/bin/bash

nohup celery -A pycelery.processor.process worker --loglevel=info --autoscale=10,10 > log.celery  2>&1 &
nohup python ./app.py > log.flask 2>&1 &
python ./stopper.py 