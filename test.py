from _Test.getImageByURL import getAllLog

from _Test.stockData import financialInformation
from _Test.stockData import financialInformationPykrx
from _Test.mockInvest import MockInvest





if __name__ == '__main__':
    #logo 가져오기
    #getAllLog()
    #test = stock()
    #test.Test()
    #test = MockInvest()
    #test.requestMockInvestStock("test")

    #financialInformation 테스트 코드
    if 1:
        test = financialInformation()
        print(test.saveDatas("005930","삼성전자"))

    # pykrx 데이터 가져오기
    if 0:
        test = financialInformationPykrx()
        test.getDatas("005930")