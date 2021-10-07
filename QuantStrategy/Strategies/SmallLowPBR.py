from QuantStrategy.Strategies.StrategyBase import StrategyBase

class SmallLowPBR(StrategyBase):
    sampleParm = {
        "strategy" : 4,
        "numberOfData" : 30,
        "data" : {
            "PBR_Q" : {
                "operater" : "up",
                "values" : [0.2]
                } 
        }
    }

    def __init__(self,parm) -> None:
        super().__init__(parm)
        
    def makeQuery(self):
        self.query = " \
        select a.\"ticker\", a.\"name\" \
        from ( \
            select cor.ticker as \"ticker\", cor.corp_name as \"name\",  fin.\"PBR_Q\"as \"PBR\", fin.\"market_cap\" \
            from financial_statement fin, corporation cor \
            where fin.\"ticker\"=cor.\"ticker\" \
            order by fin.\"market_cap\" asc \
            limit ( \
                select count(*)  * 0.2 \
                from corporation cort ) \
            ) a \
        where a.\"PBR\" >= '"+str(self.parm['data']['PBR_Q']['values'][0])+"' \
        order by a.\"PBR\" \
        limit "+str(self.parm['numberOfData'])
        
        print(self.query)
