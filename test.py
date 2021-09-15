from openAPI import pricePykrx
from _Test.stockData import financialInformation





if __name__ == '__main__':
    #financialInformation 테스트 코드
    #pykrx = pricePykrx.CPricePykrx()
    #tickers = pykrx.getAllTickerFromDB()
    if 1:
        test = financialInformation()
        #print(test.eachTickerNaver(tickers))
        print(test.eachTickerNaver([("005930","삼성전자")]))

