FROM python:3.6.8
RUN apt update
RUN mkdir Workspace
COPY . ./Workspace

RUN pip install -r ./Workspace/requirements.txt

WORKDIR /Workspace

RUN nohup celery -A pycelery.processor.process worker --loglevel=info > log.celery &

EXPOSE 5000


CMD ["python","./Workspace/app.py"]


# 뒷자리 숫자를 변경할 것
# sudo docker build -t algoridang:04 .
# sudo docker run -d --name algoridang -p 5000:5000 algoridang:04
