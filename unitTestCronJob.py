import unittest

from DB.connectionPool import databasepool
from dailyfunction import daily

class CronJobTestCase(unittest.TestCase):
    """ unit test testcase class for CronJob class """

    def setUp(self) -> None:
        dbinit = databasepool(0)
        
    def test_CronJob(self):
        daily.callDaily()


if __name__ == "__main__":
    unittest.main()