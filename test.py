from _Test.getImageByURL import getAllLog

from _Test.stockData import stock
from _Test.mockInvest import MockInvest





if __name__ == '__main__':
    #logo 가져오기
    #getAllLog()
    #test = stock()
    #test.Test()
    
    test = MockInvest("test",1)
    test.requestMockInvestStock()




