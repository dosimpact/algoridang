
from QuantStrategy.QuantSelecter import QuantSelecter
def makeTestData(sel):
    if sel == 2:
        return {
        "strategy" : 2,
        "numberOfData" : 50,
        "data" : {
            "market_cap" : {
                "operator" : "up",
                "values" : [5000]
                } ,
            "PBR_Q" : {
                "operator" : "up",
                "values" : [0]
                } 
            } 
        }
    if sel == 3:
        return {
        "strategy" : 3,
        "numberOfData" : 50,
        "data" : {
            "market_cap" : {
                "operator" : "up",
                "values" : [5000]
                } ,
            "ROE_Q" : {
                "operator" : "up",
                "values" : [0]
                } 
             ,
            "EV_per_EBITDA" : {
                "operator" : "up",
                "values" : [0]
                } 
            } 
        }
    if sel == 1:
        return {
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
    
if __name__ == '__main__':
    data = makeTestData(3)
    quant = QuantSelecter()
    print(quant.getSampleData(2))
    print(quant.runQuantStrategty(data))
    quant.printQuantList()
    print("stategy Test")