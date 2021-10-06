
from QuantStrategy.QuantContext import QuantContext
from QuantStrategy.QuantManual import QuantManual
from QuantStrategy.QuantNewMagic1_0 import QuantNewMagic1_0
from QuantStrategy.QuantOriginalMagic import QuantOriginalMagic

class QuantSelecter(object):
    def __init__(self) -> None:
        super().__init__()
        self.quantList = []
        self.quantList.append((0,"초기설정"))
        self.quantList.append((QuantManual,"사용자 전략 설정"))
        self.quantList.append((QuantNewMagic1_0, "신마법공식 1.0"))
        self.quantList.append((QuantOriginalMagic, "오리지널 마법공식"))

    def __getQuantStrategy(self, selector):
        return self.quantList[selector][0]

    def runQuantStrategty(self,parm):
        strategy = self.__getQuantStrategy(parm["strategy"])
        quant = QuantContext(strategy,parm)
        quantList = quant.getDatas()
        
        res = {}
        for idx, val in enumerate(quantList):
            res[idx] = val

        return res

    def getSampleData(self, idx):
        return self.quantList[idx][0].sampleParm

    def getQuantList(self):
        res = {}
        for idx,val in enumerate(self.quantList):
            res[idx] = val[1]
        return {"strategy" : res}
    
    def printQuantList(self):
        res = {}
        for idx,val in enumerate(self.quantList):
            res[idx] = val[1]

        print(str({"strategy" : res}))
