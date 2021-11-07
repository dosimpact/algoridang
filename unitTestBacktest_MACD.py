import unittest
from backtesting.Backtest import Backtest
from backtesting.BacktestMini import BacktestMini
from backtesting.BacktestMultiPort import BacktestMultiPort
from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI
from backtesting.Strategies.BollingerBand import BollingerBand

from backtesting.Strategies.MACD import MACD
from DB.connectionPool import databasepool

class BacktestTestMACDCase(unittest.TestCase):
    """ unit test testcase class for QuantStrategy class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
        pass

    def test_SMACrossBacktest_plot(self):
        print("test_SMACrossBacktest_plot")
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, SMACross, '20210101','20211001',20,1 )
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
    def test_rsiBacktest_plot(self):
        print("test_rsiBacktest_plot")
        
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, RSI, '20210101','20211001',20,1)
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        

    def test_macdBacktest_plot(self):
        print("test_macdBacktest_plot")
        
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, MACD, '20210101','20211001',20,1)
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        


        

    def test_BollingerBandCrossBacktest_plot(self):
        print("test_BollingerBandCrossBacktest_plot")
        
        bt = Backtest()
        res,strat= bt.backtest("035420", 1000000, BollingerBand, '20210101','20211001',20,1 )
        bt.makebacktestResult(strat)
        bt.makePortpolio()
        
        

        
if __name__ == "__main__":
    unittest.main()