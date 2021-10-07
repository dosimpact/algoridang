
from QuantStrategy.QuantContext import QuantContext
from QuantStrategy.Strategies.Manual import Manual
from QuantStrategy.Strategies.NewMagic1_0 import NewMagic1_0
from QuantStrategy.Strategies.OriginalMagic import OriginalMagic
from QuantStrategy.Strategies.SmallLowPBR import SmallLowPBR
from QuantStrategy.Strategies.GrahamsLastGift import GrahamsLastGift
from QuantStrategy.Strategies.UpgradeGrahamsLastGift import UpgradeGrahamsLastGift

class QuantSelecter(object):
    def __init__(self) -> None:
        super().__init__()
        self.quantList = []
        self.quantList.append((0,"초기설정"))
        self.quantList.append((Manual,"사용자 전략 설정"))
        self.quantList.append((NewMagic1_0, "신마법공식 1.0"))
        self.quantList.append((OriginalMagic, "오리지널 마법공식"))
        self.quantList.append((SmallLowPBR, "소형주 저pbr 전략"))
        self.quantList.append((GrahamsLastGift, "그레이엄의 마지막 선물"))
        self.quantList.append((UpgradeGrahamsLastGift, "그레이엄의 마지막 선물 업그레이드"))
        

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
