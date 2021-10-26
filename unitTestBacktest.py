import unittest
from backtesting.Backtest import Backtest
from backtesting.BacktestMini import BacktestMini
from backtesting.BacktestMultiPort import BacktestMultiPort
from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI

from DB.connectionPool import databasepool

class BacktestTestCase(unittest.TestCase):
    """ unit test testcase class for QuantStrategy class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
    
    def test_adjustAllModify(self):
        
        DBClass = databasepool()
        conn = DBClass.getConn()
        query = "select ms.strategy_code  from member_strategy ms "
        tickers = DBClass.selectData(conn, query)
        DBClass.putConn(conn)
        for i in range(len(tickers)):
            bt = BacktestMultiPort(int(tickers[i][0]))
            res = bt.portBacktest()
        
        print("test_adjustAllModify Done")

    def test_backtestTestCase(self):
        bt = Backtest()
        res,strat= bt.backtest("005930", 1000000,SMACross, '20210101','20211001',20 )
        self.assertEqual(res, 788800.0)

        res,strat = bt.backtest("005930", 1000000,RSI, '20210101','20211001',20 )
        self.assertEqual(res, 1000000.0)
        
        res,strat = bt.backtest("fesfe", 1000000,SMACross, '20210101','20211001',20 )
        self.assertEqual(res, 1000000)

    def test_getTickerDataFromDB(self):
        bt = Backtest()
        tickerDateData, state = bt._getDBData("005930",5,'20210101','20211001')
        self.assertEqual(state, "work")
        tickerDateData, state = bt._getDBData("005930",5,'20210101',None)
        self.assertEqual(state, "work")
        tickerDateData, state = bt._getDBData("asdagf",5,'20210101',None) 
        self.assertEqual(state, "pass")

    def test_getPortInfoFromDB(self):
        bt = BacktestMultiPort(2733)
        res = bt.getPortInfoFromDB()
        self.assertEqual(res[0][0], "030190")
        self.assertEqual(res[1][0], "009450")
        self.assertEqual(res[2][0], "060310")

    def test_portBacktest(self):
        #return
        bt = BacktestMultiPort(2733)
        res = bt.portBacktest()
        self.assertEqual(res, "Done")
        bt = BacktestMultiPort(0)
        res = bt.portBacktest()
        self.assertEqual(res, "error")

    def test_miniBacktest(self):
        bt = BacktestMini()
        data = {
            'ticker' : '005930',
            'salestrategy' : 'GoldenCross',
            'setting' : [5,20],
            'data' : {
                'startTime' : '20210101',
                'endTime' : ''
            } 
        }
        res = bt.getMiniBacktest(data)
        goldenvalue= {'code': 'Success', 'res': {'profit_rate': 0.077775, 'year_avg_profit_rate': -0.25, 'mdd': -0.22}}
        self.assertEqual(res, goldenvalue)


        data = {
            'ticker' : '005930',
            'salestrategy' : 'RSI',
            'setting' : [50,60],
            'data' : {
                'startTime' : '20210101',
                'endTime' : ''
            } 
        }
        res = bt.getMiniBacktest(data)
        goldenvalue= {'code': 'Success', 'res': {'mdd': -0.13, 'profit_rate': 0.092631, 'year_avg_profit_rate': -0.08}}
        self.assertEqual(res, goldenvalue)

        
        data = {
            'salestrategy' : 'RSI',
            'setting' : [50,60],
            'data' : {
                'startTime' : '20210101',
                'endTime' : ''
            } 
        }
        res = bt.getMiniBacktest(data)
        goldenvalue= {'code': 'Success', 'res': {'mdd': -0.13, 'profit_rate': 0.092631, 'year_avg_profit_rate': -0.08}}
        self.assertEqual(res, goldenvalue)


def suite():
    suite = unittest.TestSuite()
    suite.addTest(BacktestTestCase('test_adjustAllModify'))
    return suite
if __name__ == "__main__":
    unittest.main()
    #runner = unittest.TextTestRunner()
    #runner.run(suite())