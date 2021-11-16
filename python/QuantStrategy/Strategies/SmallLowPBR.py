from QuantStrategy.Strategies.StrategyBase import StrategyBase

class SmallLowPBR(StrategyBase):
    sampleParm = {
        "strategy" : 4,
        "numberOfData" : 30,
        "data" : {
            "PBR_Q" : {
                "operator" : "up",
                "values" : [0.2]
                } 
        }
    }

    def __init__(self,parm) -> None:
        """ Initailizer
        
        @parms
            parm - dict 각 전략마다 다름
                QuantSelecter.getSampleData를 통해 각 전략에 맞는 parm을 받아 볼 수 있음.
                혹은 this.sampleParm 참조 
        """
        
        parmTemp = {}
        for key, val in parm.items():
            if key == 'data':
                dataTemp = {}
                for datakey, dataval in parm[key].items():
                    if type(dataval) == type({}) and (datakey  == "PBR_Q" ):
                        dataTemp[datakey] = dataval
                parmTemp[key] = dataTemp
            else:
                parmTemp[key] = val
        super().__init__(parm)
        
    def makeQuery(self):
        """ DB 조회를 위한 Query 생성 """
        
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
