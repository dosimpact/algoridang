import dart_fss as dart
from numpy.core.numeric import full
from _Test.opendartAPIkey import key

#open dart api 문제 : 연 1회 데이터.
class openDartAPI(object):
    def __init__(self) -> None:
        super().__init__()
    
    def Test(self):
        # Open DART API KEY 설정
        api_key= key
        dart.set_api_key(api_key=api_key)

        # DART 에 공시된 회사 리스트 불러오기
        corp_list = dart.get_corp_list()

        # 삼성전자 검색
        samsung = corp_list.find_by_corp_name('삼성전자', exactly=True)[0]

        # 2012년부터 연간 연결재무제표 불러오기
        fs = samsung.extract_fs(bgn_de='20120101')
        print("123123123")
        # 재무제표 검색 결과를 엑셀파일로 저장 ( 기본저장위치: 실행폴더/fsdata )
        fs.save()


from pykrx import stock
class  financialInformationPykrx(object):
    def __init__(self) -> None:
        super().__init__()

    def getDatas(self, ticker):
        df = stock.get_market_price_change_by_ticker(fromdate="20210517", todate="20210520")
        print(df)

        df = stock.get_market_fundamental_by_ticker(date="20210520")
        print(df)

        df = stock.get_market_fundamental_by_date(fromdate="20210517", todate="20210520", ticker="005930")
        print(df)


import pandas as pd
import requests

class financialInformation(object):
    def __init__(self) -> None:
        super().__init__()

    # testurl = https://comp.fnguide.com/SVO2/ASP/SVD_main.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=11&stkGb=&strResearchYN=
    def saveDatas(self, ticker, name):
        # 발생 오류
        # page 변경 연결 불가
        # table 변경
        try :
            URL = "https://comp.fnguide.com/SVO2/ASP/SVD_main.asp?pGB=1&gicode=A"+str(ticker)+"&cID=&MenuYn=Y&ReportGB=&NewMenuID=11&stkGb=&strResearchYN="
            
            fs_page = requests.get(URL)
            fs_tables = pd.read_html(fs_page.text)
            print(fs_page)

            """
            for i in range (len(fs_tables)):
                print(">>>>>>>  table",i)
                print(fs_tables[i])
            """

            # 일간 재무정보
            dailyTable = self.makeDailyFinancial(fs_tables, name)

            # 분기별 재무정보
            quearterTable = self.makeQuarterFinancial(fs_tables, name)

            #데이터 합치기
            fullTable  = pd.concat([dailyTable,quearterTable])

            return fullTable
        except Exception as error:
            print("###finance data get error \"fs_tables\" : ", error)
            return None

    def makeQuarterFinancial(self, fs_tables, name):
        QuarterfinancialTalbe = fs_tables[12]
        #멀티 인덱싱(사실은 멀티 컬럼) 
        newcol = list(map(lambda x: ' '.join(x[1:]),QuarterfinancialTalbe.columns))
        newcol[0]='구분'
        QuarterfinancialTalbe.columns = newcol

        QuarterfinancialTalbe = QuarterfinancialTalbe.set_index('구분')
        QuarterfinancialTalbe = QuarterfinancialTalbe.iloc[:,[-4]]
        QuarterfinancialTalbe.columns = [name]
        QuarterfinancialTalbe = QuarterfinancialTalbe.drop(['PER'])

        return QuarterfinancialTalbe

    def makeDailyFinancial(self, fs_tables, name):
        dailyfinancialTalbe = fs_tables[8]
        dailyfinancialTalbe = dailyfinancialTalbe.set_index('구분')
        dailyfinancialTalbe = dailyfinancialTalbe.iloc[:,[0]]
        dailyfinancialTalbe.columns = [name]

        return dailyfinancialTalbe


