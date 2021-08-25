import dart_fss as dart
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



class stock(object):
    def __init__(self) -> None:
        super().__init__()