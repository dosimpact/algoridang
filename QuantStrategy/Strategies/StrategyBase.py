from abc import *
from openAPI.DB.connectionPool import databasepool

class StrategyBase(object):
    def __init__(self,parm) -> None:
        """ Initailizer
        
        @parms
            parm - dict 각 전략마다 다름
                QuantSelecter.getSampleData를 통해 각 전략에 맞는 parm을 받아 볼 수 있음.
                혹은 this.sampleParm 참조 
        """
        super().__init__()
        self.query = ""
        self.parm = parm

    def lookup(self):
        """ DB 조회 함수 """
        
        # 정상 동작시 [(ticker, 회사명) ...] 리스트 출력
        # 비정상 동작시 출력없음

        res = []
        DBClass = databasepool()
        conn = DBClass.getConn()
        
        try:
            res = DBClass.selectData(conn,self.query)
            DBClass.putConn(conn)
            
        except:
            print("QuantStratgy - DB error!!")
            DBClass.putConn(conn)

        return res
 

 
    # 추상 메서드
    @abstractmethod
    def makeQuery(self):
        """ DB 조회를 위한 Query 생성을 위한 추상 객체 """
        
        pass

