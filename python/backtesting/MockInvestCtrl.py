
from DB.connectionPool import databasepool
from backtesting.BacktestMultiPort import BacktestMultiPort

class MockInvestCtrl():
    """모의투자 class
    @methods
        __init__ - Initailizer
        searchMockInvest - 모의투자 실행 함수
    """
    def __init__(self) -> None:
        """ Initailizer """
        pass
        
    def searchMockInvest(self):
        """ 모의 투자 실행하기 """
        db = databasepool()
        conn = db.getConn()

        query = "select * from member_strategy where operation_yes_no = true ;"
        mockList = db.selectData(conn, query)
        db.putConn(conn)
        for i in range(len(mockList)):
            # 5번
            startegyCode = int(mockList[i][5])
            
            bt = BacktestMultiPort(startegyCode)
            res = bt.portBacktest()

        
