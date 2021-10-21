from QuantStrategy.Strategies.StrategyBase import StrategyBase

class Manual(StrategyBase):
    strategyInfo = ""
    sampleParm = {
        "strategy" : 1,
        "numberOfData" : 5,
        "data" : {
            "market_cap" : {
                "operator" : "up",
                "values" : [5000]
                } ,
            "revenue" : 0 ,
            "operating_income" : 0 ,
            "EPS" : 0 ,
            "PER" : 0 ,
            "EV_per_EBITDA" : 0 ,
            "ROE" : 0 ,
            "dividend_yield" : 0 ,
            "BETA" : 0 ,
            "revenue_Q" : 0 ,
            "operating_income_Q" : 0 ,
            "net_income_Q" : 0 ,
            "controlling_interest_Q" : 0 ,
            "non_controlling_interest_Q" : 0 ,
            "total_assets_Q" : 0 ,
            "total_stock_holders_Q" : 0 ,
            "controlling_interest_share_Q" : 0 ,
            "non_controlling_interest_share_Q" : 0 ,
            "capital_Q" : 0 ,
            "debt_ratio_Q" : 0 ,
            "retention_rate_Q" : 0 ,
            "operating_margin_Q" : 0 ,
            "controlling_interest_rate_Q" : 0 ,
            "ROA_Q" : 0 ,
            "ROE_Q" : 0 ,
            "EPS_Q" : 0 ,
            "BPS_Q" : 0 ,
            "DPS_Q" : 0 ,
            "PBR_Q" : 0 ,
            "outstanding_shares_Q" : 0 ,
            "dividend_yield__Q" : 0 
            }
        }
        
    def __init__(self,parm) -> None:
        """ Initailizer
        
        @parms
            parm - dict 각 전략마다 다름
                QuantSelecter.getSampleData를 통해 각 전략에 맞는 parm을 받아 볼 수 있음.
                혹은 this.sampleParm 참조 
        """
        super().__init__(parm)
        

    def makeQuery(self):
        """ DB 조회를 위한 Query 생성 """
        
        self.query = "select c.ticker ,c.corp_name from financial_statement f, corporation c"
        queryWhere = " where f.ticker = c.ticker "
        queryOrderBy = " order by "

        queryLimit = " limit " + str(self.parm["numberOfData"])

        
        for key, val in self.parm["data"].items():
            if type(val) == type({}):
                if val['operator'] == "up":
                    queryWhere += " and \'" + str(key) + "\' >= \'"+ str(val['values'][0]) +"\'" 
                if val['operator'] == "down":
                    queryWhere += " and \'" + str(key) + "\' <= \'"+ str(val['values'][0]) +"\'"
                if val['operator'] == "between":
                    queryWhere += " and \'" + str(key) + "\' >= \'"+ str(val['values'][0]) +"\'" 
                    queryWhere += " and \'" + str(key) + "\' <= \'"+ str(val['values'][1]) +"\'" 
                queryOrderBy += str(key) + " desc "
        
        self.query += queryWhere
        self.query += queryOrderBy
        self.query += queryLimit
        #print(self.query)
