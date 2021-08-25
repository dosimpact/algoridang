FROM python:3.6.8
RUN apt update
RUN mkdir Workspace
COPY . ./Workspace

RUN pip install -r ./Workspace/requirements.txt

RUN nohup python ./Workspace/app.py > log.flask &
RUN nohup celery -A pycelery.processor.process worker --loglevel=info > log.celery &

EXPOSE 5000