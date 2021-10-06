from QuantStrategy.Strategies.StrategyBase import StrategyBase

class Manual(StrategyBase):
    sampleParm = {
        "strategy" : 1,
        "numberOfData" : 5,
        "data" : {
            "market_cap" : {
                "operater" : "up",
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
        super().__init__(parm)
        

    def makeQuery(self):
        self.query = "select c.ticker ,c.corp_name from financial_statement f, corporation c"
        queryWhere = " where f.ticker = c.ticker "
        queryOrderBy = " "
        queryLimit = " "
        for key, val in self.parm.items():
            if key == "numberOfData":
                queryLimit = " limit " + str(val)
                continue
            if type(val) == type({}):
                if val['operater'] == "up":
                    queryWhere += " and \'" + str(key) + "\' >= \'"+ str(val['values'][0]) +"\'" 
                    
                    queryOrderBy += str(key) + " desc "
                if val['operater'] == "down":
                    queryWhere += " and \'" + str(key) + "\' <= \'"+ str(val['values'][0]) +"\'"
                if val['operater'] == "between":
                    queryWhere += " and \'" + str(key) + "\' >= \'"+ str(val['values'][0]) +"\'" 
                    queryWhere += " and \'" + str(key) + "\' <= \'"+ str(val['values'][1]) +"\'" 
        
        self.query += queryWhere
        self.query += queryOrderBy
        self.query += queryLimit
        print(self.query)
        
