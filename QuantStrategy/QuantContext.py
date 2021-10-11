class QuantContext (object):
    def __init__(self, strategy, parm) -> None:
        """ Initailizer
        
        @parms
            strategy - QuantSelecter.quantList에 있는 전략을 사용
                QuantSelecter.__getQuantStrategy를 통해 전략 설정
            parm - dict 각 전략마다 다름
                QuantSelecter.getSampleData를 통해 각 전략에 맞는 parm을 받아 볼 수 있음.
        """
        super().__init__()
        self.strategy = strategy(parm)

    def getDatas(self) :
        """ DB에서 전략 수행하기 """
        self.strategy.makeQuery()
        return self.strategy.lookup()

