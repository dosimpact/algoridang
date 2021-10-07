from QuantStrategy.Strategies.StrategyBase import StrategyBase

class GrahamsLastGift(StrategyBase):
    strategyInfo = " \
        난이도 : 초급 \
        스타일 : 밸류 + 퀄리티\
        조건 : 아래 조건에 적합한 주식 20~30개 매수 \n- PER 10 이하.,종목이 충분할 경우 PER 5이하로 제한\n- 부채비율 50% 이하\
        \
    "
    sampleParm = {
    "strategy" : 5,
    "numberOfData" : 30,
    "data" : {
        "PER" : {
            "operater" : "down",
            "values" : [10]
            } ,
        "debt_ratio_Q" : {
            "operater" : "down",
            "values" : [50]
            } 
        } 
    }
    def __init__(self,parm) -> None:
        super().__init__(parm)
        
        

    def makeQuery(self):
        self.query = " \
        select a.\"ticker\", a.\"name\" \
        from ( \
            select cor.ticker as \"ticker\", cor.corp_name as \"name\",  fin.\"PER\"as \"PER\",  fin.\"debt_ratio_Q\"as \"debt_ratio_Q\" \
            from financial_statement fin, corporation cor \
            where fin.\"ticker\"=cor.\"ticker\" \
            and fin.\"PER\" <= '"+str(self.parm['data']['PER']['values'][0])+"' \
            and fin.\"debt_ratio_Q\" <= '"+str(self.parm['data']['debt_ratio_Q']['values'][0])+"' \
            ) a \
        order by a.\"PER\" \
        limit "+str(self.parm['numberOfData'])
        
        print(self.query)

        
