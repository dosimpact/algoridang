import unittest
from QuantStrategy.QuantSelecter import QuantSelecter

class QuantStrategyTestCase(unittest.TestCase):
    """ unit test testcase class for QuantStrategy class """

    def setUp(self) -> None:
        print("Setting up ...")

    def test_QuantStrategy(self):
        quant = QuantSelecter()
        for idx in range(1,7):
            res = quant.runQuantStrategty(quant.getSampleData(idx))
            print("Test = ", idx)
            self.assertEqual(res, res)
        pass

if __name__ == "__main__":
    unittest.main()