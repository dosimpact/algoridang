#!/bin/bash

#nohup python ./app.py > log.flask &
nohup celery -A pycelery.processor.process worker --loglevel=info --autoscale=3,3 > log.celery &

python ./app.py