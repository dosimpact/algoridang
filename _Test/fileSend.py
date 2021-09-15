import requests
import json
def upload():
    url = 'https://algoridang.herokuapp.com'
    url = url + '/v1/api/upload/ticker'
    url = 'http://192.168.1.8:4000/v1/api/upload/ticker'
    headers = {'Content-Type' : 'multipart/form-data', 'x-jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InlwZDAzMDA4QGdtYWlsLmNvbSIsImlhdCI6MTYyNzM3NTA5Nn0.SiAuwBFEjdlc0WQZOh8Qbmzti1jKdkoFlsdSeRLckZM'} 
    data = {}
    files = {'file': open('./_Test/TEST2.PNG', 'rb')}

    res = requests.post(url, headers=headers, files=files)

    print(res)
    #print(json.loads(res.text))
    print(res)


if __name__ == '__main__':
    upload()
