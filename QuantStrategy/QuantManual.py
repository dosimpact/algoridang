from QuantStrategy.QuantStrategy import QuantStrategy

class QuantManual(QuantStrategy):
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
        
