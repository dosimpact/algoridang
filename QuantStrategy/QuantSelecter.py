
from QuantStrategy.QuantContext import QuantContext
from QuantStrategy.Strategies.Manual import Manual
from QuantStrategy.Strategies.NewMagic1_0 import NewMagic1_0
from QuantStrategy.Strategies.OriginalMagic import OriginalMagic
from QuantStrategy.Strategies.SmallLowPBR import SmallLowPBR
from QuantStrategy.Strategies.GrahamsLastGift import GrahamsLastGift
from QuantStrategy.Strategies.UpgradeGrahamsLastGift import UpgradeGrahamsLastGift

class QuantSelecter(object):
    """ Qunat 전략을 골라 진행하는 클래스

    Main methods :
        __getQuantStrategy - quantList에 해당하는 전략 가져오기
        runQuantStrategty - 전략에 기반한 [(회사명, ticker)..]리스트 가져오기
        getSampleData - list에 있는 전략별 샘플 파라미터 데이터 불러오기
        getQuantList - quantList 불러오기
        printQuantList - quantList 콘솔창에 보여주기
    """
    def __init__(self) -> None:
        """ Initializer """
        super().__init__()
        self.quantList = []
        self.quantList.append((0,"초기설정"))
        self.quantList.append((Manual,"사용자 전략 설정"))
        self.quantList.append((NewMagic1_0, "신마법공식 1.0"))
        self.quantList.append((OriginalMagic, "오리지널 마법공식"))
        self.quantList.append((SmallLowPBR, "소형주 저pbr 전략"))
        self.quantList.append((GrahamsLastGift, "그레이엄의 마지막 선물"))
        self.quantList.append((UpgradeGrahamsLastGift, "그레이엄의 마지막 선물 업그레이드"))
        

    def __getQuantStrategy(self, idx):
        """ qunatList 에서 전략 가져오기

        @parms
            idx - 전략 선택 인덱스
        """
        return self.quantList[idx][0]

    def runQuantStrategty(self,parm):
        """ 파라미터를 이용하여 전략 실행하기

        @parms
            parm - dict 각 전략마다 다름
                getSampleData를 통해 각 전략에 맞는 parm을 받아 볼 수 있음.
        """
        strategy = self.__getQuantStrategy(parm["strategy"])
        quant = QuantContext(strategy,parm)
        quantList = quant.getDatas()
        
        res = {}
        for idx, val in enumerate(quantList):
            res[idx] = val

        return res

    def getSampleData(self, idx):
        """ sampleData 가져오기

        @parms
            idx - 전략 선택 인덱스
        """
        return self.quantList[idx][0].sampleParm

    def getQuantList(self):
        """ sampleData 가져오기 """

        res = {}
        for idx,val in enumerate(self.quantList):
            res[idx] = val[1]
        return {"strategy" : res}
    
    def printQuantList(self):
        """ 현재 사용 가능한 Quant 전략 리스트 확인하기 """

        res = {}
        for idx,val in enumerate(self.quantList):
            res[idx] = val[1]

        print(str({"strategy" : res}))
