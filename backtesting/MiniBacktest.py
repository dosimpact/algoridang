from abc import *

class MiniBacktest():
    __metaclass__ = ABCMeta

    @abstractmethod
    def minibacktest(self, miniBackData):
        pass