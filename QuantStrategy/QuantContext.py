class QuantContext (object):
    def __init__(self, strategy, parm) -> None:
        super().__init__()
        #self.strategy = strategy
        #self.strategy.parm = parm
        self.strategy = strategy(parm)

    def getDatas(self):
        self.strategy.makeQuery()
        return self.strategy.lookup()

