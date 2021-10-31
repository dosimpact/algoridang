import unittest
from backtesting.Backtest import Backtest
from backtesting.BacktestMini import BacktestMini
from backtesting.BacktestMultiPort import BacktestMultiPort
from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI

from backtesting.Strategies.MACD import MACD
from DB.connectionPool import databasepool

class BacktestTestMACDCase(unittest.TestCase):
    """ unit test testcase class for QuantStrategy class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
        pass

    def test_rsiBacktest_plot(self):
        
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, RSI, '20000101','20211001',20,1)
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
        self.assertEqual(res, 1303700.0)

    def test_macdBacktest_plot(self):
        
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, MACD, '20000101','20211001',20,1)
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
        self.assertEqual(res, 1303700.0)


    def test_macdBacktest_plot_comp(self):
        
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, SMACross, '20200101','20211001',20 )
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
        self.assertEqual(res, 1051000.0)
        

        
if __name__ == "__main__":
    unittest.main()