import unittest

from DB.connectionPool import databasepool
from openAPI.pricePykrx import CPricePykrx

class PykrxTestCase(unittest.TestCase):
    """ unit test testcase class for CronJob class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
        
    def test_getDataFromDB(self):
        pykrx = CPricePykrx()
        pykrx.getAllTickerFromDB()

    def test_setDatainDbOneTicker(self):
        pykrx = CPricePykrx()
        tickers = pykrx.getAllTickerFromDB()
        updateData = []
        total = len(tickers)
        print(total)
        idx = 0
        for ticker, name in tickers:
            idx += 1
            df = pykrx.getKRStockDaily(ticker,'20110101')
            res = pykrx.sendKRStockDaily(ticker, df)

            if res != "":
                updateData.append((ticker, name))
            break



if __name__ == "__main__":
    unittest.main()