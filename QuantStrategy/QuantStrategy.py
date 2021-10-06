from abc import *
from openAPI.DB.connectionPool import databasepool

class QuantStrategy(object):
    def __init__(self,parm) -> None:
        super().__init__()
        self.query = ""
        self.parm = parm

    def lookup(self):
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
        pass

