
from openAPI.DB.connectionPool import databasepool
from backtesting.backtesting import CBackTtrader

class MockInvestCtrl():
    def __init__(self) -> None:
        pass
        
    def searchMockInvest(self):
        db = databasepool()
        conn = db.getConn()

        query = "select * from member_strategy where operation_yes_no = true ;"
        mockList = db.selectData(conn, query)
        db.putConn(conn)
        for i in range(len(mockList)):
            # 5번
            print()
            startegyCode = int(mockList[i][5])
            
            bk = CBackTtrader(None,startegyCode)
            res = bk.requestBacktestOneStock()

        
