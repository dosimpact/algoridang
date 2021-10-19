import os
import time
from PIL import Image

from DB.connectionPool import databasepool

from openAPI import pricePykrx


def logoimageSave (ticker):
    # 다운받을 이미지 url
    url = "https://s3.ap-northeast-2.amazonaws.com/alphasquare-s3/static/images/company_logos/"+ticker+".png"

    #url = "https://"+ticker+".png"
    # time check
    start = time.time()

    # curl 요청
    # curl "이미지 주소" > "저장 될 이미지 파일 이름" 
    res = os.system("curl " + url + " > ./logo/"+ticker+".jpg")

    # res 3 : malformed (url 오류)
    # res 6 : could not resolve host (이미지가 존재하지 않음.)
    # res 0 : could not resolve host (이미지가 존재하지 않음.)
    # 이미지 다운로드 시간 체크

    # 저장 된 이미지 확인
    #curl_img = Image.open("./logo/"+ticker+".jpg")
    
    file_size = os.path.getsize("./logo/"+ticker+".jpg") 
    
    if file_size < 500:
        os.remove("./logo/"+ticker+".jpg")
    else :
        print(ticker,time.time() - start,file_size,sep="  ")
    time.sleep(1)


def getAllLog():

    pykrx = pricePykrx.CPricePykrx()
    tickers = pykrx.getAllTickerFromDB()
    
    for ticker ,name in tickers:
        print(ticker,name,sep= " ")
        logoimageSave(ticker)

