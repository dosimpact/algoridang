from unitTestBacktest import BacktestTestCase
from unitTestBacktest_boll import BacktestTestBollCase
from unitTestBacktest_Strategy import BacktestStrategyTestCase
from unitTestCronJob import CronJobTestCase
from unitTestQuantStrategy import QuantStrategyTestCase
from types import FunctionType
import unittest


def make_suite(testcase : unittest.TestCase, tests:list) -> unittest.TestSuite :
    return unittest.TestSuite(map(testcase,tests))



if __name__ == "__main__":
    suite = unittest.TestSuite()
    li = [BacktestTestCase, BacktestTestBollCase, BacktestStrategyTestCase, CronJobTestCase, QuantStrategyTestCase]
    cnt = 0
    for classname in li:
        testFunctions = []
        for key, value in classname.__dict__.items():
            if 'test' in key and isinstance(value, FunctionType):
                testFunctions.append(key)
                cnt += 1

        for testFunction in testFunctions:
            suite.addTest(classname(testFunction))

    print("테스트 케이스 수 : ", cnt)
    runner = unittest.TextTestRunner()
    #runner.run(suite)