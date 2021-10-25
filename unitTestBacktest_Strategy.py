import unittest
from backtesting.Backtest import Backtest
from backtesting.BacktestMini import BacktestMini
from backtesting.BacktestMultiPort import BacktestMultiPort
from backtesting.Strategies.SMACross import SMACross
from backtesting.Strategies.RSI import RSI

from DB.connectionPool import databasepool

class BacktestStrategyTestCase(unittest.TestCase):
    """ unit test testcase class for QuantStrategy class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
        pass

    def test_getPortInfoFromDB(self):
        bt = BacktestMultiPort(2746)
        res = bt.portBacktest()


if __name__ == "__main__":
    unittest.main()