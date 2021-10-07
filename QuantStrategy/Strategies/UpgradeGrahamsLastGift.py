from QuantStrategy.Strategies.StrategyBase import StrategyBase

class UpgradeGrahamsLastGift(StrategyBase):
    strategyInfo = " \
        난이도 : 초급 \
        스타일 : 밸류 + 퀄리티\
        조건 : 아래 조건에 적합한 주식 20~30개 매수\n - ROA 5%이상이고 부채비율 50% 이하인 기업중에서,\n - PBR낮은 기업부터 매수해(PBR < 0.2 기업은 제외) 20~30개 기업 매수 \
        \
    "

    sampleParm = {
    "strategy" : 6,
    "numberOfData" : 30,
    "data" : {
        "PBR_Q" : {
            "operater" : "up",
            "values" : [0.2]
            } ,
        "debt_ratio_Q" : {
            "operater" : "down",
            "values" : [50]
            } ,
        "ROA_Q" : {
            "operater" : "up",
            "values" : [5]
            } 
        } 
    }
    def __init__(self,parm) -> None:
        super().__init__(parm)
        
        

    def makeQuery(self):
        self.query = " \
        select a.\"ticker\", a.\"name\" \
        from ( \
            select cor.ticker as \"ticker\", cor.corp_name as \"name\",  fin.\"ROA_Q\"as \"ROA_Q\",  fin.\"PBR_Q\"as \"PBR_Q\" \
            from financial_statement fin, corporation cor \
            where fin.\"ticker\"=cor.\"ticker\" \
            and fin.\"PBR_Q\" >= '"+str(self.parm['data']['PBR_Q']['values'][0])+"' \
            and fin.\"ROA_Q\" >= '"+str(self.parm['data']['ROA_Q']['values'][0])+"' \
            and fin.\"debt_ratio_Q\" <= '"+str(self.parm['data']['debt_ratio_Q']['values'][0])+"' \
            order by fin.\"PBR_Q\" asc \
            ) a \
        limit "+str(self.parm['numberOfData'])
        
        print(self.query)

        
