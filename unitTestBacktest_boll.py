import unittest
from backtesting.Backtest import Backtest
from backtesting.BacktestMini import BacktestMini
from backtesting.BacktestMultiPort import BacktestMultiPort
from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI

from backtesting.Strategies.BollingerBand import BollingerBand
from DB.connectionPool import databasepool

class BacktestTestCase(unittest.TestCase):
    """ unit test testcase class for QuantStrategy class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
        pass

    def test_bollBacktest_plot(self):

        bt = Backtest()
        res,strat= bt.backtest("005930", 1000000, BollingerBand, '20200101','20211001',20)
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
        self.assertEqual(res, 1296700.0)
    def test_bollBacktest_plot_comp(self):

        bt = Backtest()
        res,strat= bt.backtest("005930", 1000000, SMACross, '20200101','20211001',20 )
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
        self.assertEqual(res, 1051000.0)
        

    def test_bollminiBacktest(self):
        
        bt = BacktestMini()
        data = {
            'ticker' : '005930',
            'salestrategy' : 'BollingerBand',
            'setting' : [20],
            'data' : {
                'startTime' : '20210101',
                'endTime' : ''
            } 
        }
        res = bt.getMiniBacktest(data)
        goldenvalue= {'code': 'Success', 'res': {'mdd': -0.16, 'profit_rate': 0.094691, 'year_avg_profit_rate': -0.06}}
        self.assertEqual(res, goldenvalue)
        
if __name__ == "__main__":
    unittest.main()