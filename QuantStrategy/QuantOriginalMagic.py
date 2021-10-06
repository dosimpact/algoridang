from QuantStrategy.QuantStrategy import QuantStrategy

class QuantOriginalMagic(QuantStrategy):
    def __init__(self,parm) -> None:
        super().__init__(parm)
        

    def makeQuery(self):
        self.query = " \
        select b.\"ticker\" , b.\"name\",b.\"sum\" \
        from( \
            select a.\"ticker\"as \"ticker\" , a.\"name\"  as \"name\", a.\"RANK_EV_per_EBITDA\" + a.\"RANK_ROE_Q\" as \"sum\" \
            from ( \
                select  c.\"ticker\"as \"ticker\" , c.\"name\"  as \"name\", rank () OVER(order by c.\"EV_per_EBITDA\" desc) as \"RANK_EV_per_EBITDA\", rank () over(order by c.\"ROE_Q\" asc) as \"RANK_ROE_Q\", c.\"EV_per_EBITDA\", c.\"ROE_Q\" \
                from ( \
                    select cor.ticker as \"ticker\", cor.corp_name as \"name\", fin.\"EV_per_EBITDA\" as \"EV_per_EBITDA\", fin.\"ROE_Q\" as \"ROE_Q\" \
                    from financial_statement fin, corporation cor \
                    where fin.\"ticker\"=cor.\"ticker\"   \
                    and fin.\"EV_per_EBITDA\" >= "+str(self.parm['data']['EV_per_EBITDA']['values'][0])+" \
                    and fin.\"ROE_Q\" >= "+str(self.parm['data']['ROE_Q']['values'][0])+" \
                    and fin.\"market_cap\" >= '"+str(self.parm['data']['market_cap']['values'][0])+"' \
                    \
                ) c \
                ) a \
            ) b \
        order by b.\"sum\" desc \
        limit "+str(self.parm['numberOfData'])
        
        print(self.query)

        
