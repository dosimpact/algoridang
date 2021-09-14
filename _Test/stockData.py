#import dart_fss as dart
#from numpy.core.numeric import full
#from _Test.opendartAPIkey import key

from numpy.core.numeric import NaN
import pandas as pd
import requests
from openAPI.DB.connectionPool import databasepool
from datetime import datetime, timedelta

class financialInformation(object):
    def __init__(self) -> None:
        super().__init__()
        fullTable = []

    def saveDatas(self, ticker, name):
        try :
            
            # DB 틀만들기
            #날짜 티커 정보 만들기 
            quarterDate = self.makeQuarterDate()
            DBTable =pd.DataFrame([('날짜',quarterDate)],columns=['구분',name]) 
            DBTable.loc[1] = ['ticker',ticker]
            DBTable = DBTable.set_index('구분')

            URL = "https://comp.fnguide.com/SVO2/ASP/SVD_main.asp?pGB=1&gicode=A"+str(ticker)+"&cID=&MenuYn=Y&ReportGB=&NewMenuID=11&stkGb=&strResearchYN="
            
            fs_page = requests.get(URL)
            fs_tables = pd.read_html(fs_page.text)
            print(fs_page)

            # 일간 재무정보
            dailyTable = self.makeDailyFinancial(fs_tables, name)

            # 분기별 재무정보
            quearterTable = self.makeQuarterFinancial(fs_tables, name)

            #데이터 합치기
            self.fullTable  = pd.concat([DBTable,dailyTable,quearterTable])
            
            #데이터 합치기
            self.saveDB()


        except Exception as error:
            print("###finance data get error \"fs_tables\" : ", error)
            return None


    def makeQuarterDate(self):
        yearToday = datetime.today().strftime("%Y")
        monthToday = datetime.today().strftime("%m")
        intMonthToday =  int(int(monthToday) / 3) * 3
        monthQuarter = str(intMonthToday).rjust(2,'0')

        return (yearToday + "-" + monthQuarter + "-" + '01')

    def makeQuarterFinancial(self, fs_tables, name):
        QuarterfinancialTalbe = fs_tables[12]
        #멀티 인덱싱(사실은 멀티 컬럼) 
        newcol = list(map(lambda x: ' '.join(x[1:]),QuarterfinancialTalbe.columns))
        newcol[0]='구분'
        QuarterfinancialTalbe.columns = newcol

        QuarterfinancialTalbe = QuarterfinancialTalbe.set_index('구분')
        QuarterfinancialTalbe = QuarterfinancialTalbe.iloc[:,[-4]]
        QuarterfinancialTalbe.columns = [name]
        QuarterfinancialTalbe = QuarterfinancialTalbe.drop(['PER'])

        return QuarterfinancialTalbe

    def makeDailyFinancial(self, fs_tables, name):
        dailyfinancialTalbe = fs_tables[8]
        dailyfinancialTalbe = dailyfinancialTalbe.set_index('구분')
        dailyfinancialTalbe = dailyfinancialTalbe.iloc[:,[0]]
        dailyfinancialTalbe.columns = [name]

        return dailyfinancialTalbe

    def saveDB(self):
        
        db = databasepool()
        conn = db.getConn()

        for idx in range(len(self.fullTable)):
            val = self.fullTable.iloc[idx,0]
            if val is None or val is NaN:
                self.fullTable.iloc[idx,0] = 0
                print(self.fullTable)

        quarterDate = str(self.fullTable.iloc[0,0]) + "T15:30:00+09:00"
        ticker = self.fullTable.iloc[1,0]

        query = "select * from financial_statement where \"finance_date\" =\'"+str(quarterDate)+"\'and \"ticker\" = \'"+str(ticker)+"\'"
           
        if len(db.selectData(conn,query)) == 0:
            query = "insert into financial_statement(\
                \"finance_date\", \"ticker\", \"market_cap\",\
                \"revenue\", \"operating_income\", \"EPS\",\
                \"PER\", \"EV_per_EBITDA\", \"ROE\",\
                \"dividend_yield\", \"BETA\", \"revenue_Q\",\
                \"operating_income_Q\", \"net_income_Q\", \"controlling_interest_Q\",\
                \"non_controlling_interest_Q\", \"total_assets_Q\", \"total_stock_holders_Q\",\
                \"controlling_interest_share_Q\", \"non_controlling_interest_share_Q\", \"capital_Q\",\
                \"debt_ratio_Q\", \"retention_rate_Q\", \"operating_margin_Q\",\
                \"controlling_interest_rate_Q\", \"ROA_Q\", \"ROE_Q\",\
                \"EPS_Q\", \"BPS_Q\", \"DPS_Q\",\
                \"PBR_Q\", \"outstanding_shares_Q\", \"dividend_yield__Q\") "

            query += "values(\
                \'"+str(quarterDate)+"\',\'"+str(ticker)+"\',\
                "+str(int(self.fullTable.iloc[2,0] ))+",\
                "+str(int(self.fullTable.iloc[3,0] ))+",\
                "+str(int(self.fullTable.iloc[4,0] ))+",\
                "+str(int(self.fullTable.iloc[5,0] ))+",\
                "+str(self.fullTable.iloc[6,0] )+",\
                "+str(self.fullTable.iloc[8,0] )+",\
                "+str(self.fullTable.iloc[7,0] )+",\
                "+str(self.fullTable.iloc[9,0] )+",\
                "+str(self.fullTable.iloc[10,0])+",\
                "+str(int(self.fullTable.iloc[11,0]))+",\
                "+str(int(self.fullTable.iloc[12,0]))+",\
                "+str(int(self.fullTable.iloc[13,0]))+",\
                "+str(int(self.fullTable.iloc[14,0]))+",\
                "+str(int(self.fullTable.iloc[15,0]))+",\
                "+str(int(self.fullTable.iloc[16,0]))+",\
                "+str(int(self.fullTable.iloc[17,0]))+",\
                "+str(int(self.fullTable.iloc[18,0]))+",\
                "+str(int(self.fullTable.iloc[19,0]))+",\
                "+str(int(self.fullTable.iloc[20,0]))+",\
                "+str(self.fullTable.iloc[21,0])+",\
                "+str(self.fullTable.iloc[22,0])+",\
                "+str(self.fullTable.iloc[23,0])+",\
                "+str(self.fullTable.iloc[24,0])+",\
                "+str(self.fullTable.iloc[25,0])+",\
                "+str(self.fullTable.iloc[26,0])+",\
                "+str(int(self.fullTable.iloc[27,0]))+",\
                "+str(int(self.fullTable.iloc[28,0]))+",\
                "+str(int(self.fullTable.iloc[29,0]))+",\
                "+str(self.fullTable.iloc[30,0])+",\
                "+str(int(self.fullTable.iloc[31,0]))+",\
                "+str(self.fullTable.iloc[32,0])+")"
            
            db.insertIntoData(conn,query)
            conn.commit()
            
        else:
            query = "update financial_statement set "
            query += " \"market_cap\" = "                       + str(int(self.fullTable.iloc[2,0]))+ ","
            query += " \"revenue\" = "                          + str(int(self.fullTable.iloc[3,0]))+ ","
            query += " \"operating_income\" = "                 + str(int(self.fullTable.iloc[4,0]))+ ","
            query += " \"EPS\" = "                              + str(int(self.fullTable.iloc[5,0]))+ ","
            query += " \"PER\" = "                              + str(self.fullTable.iloc[6,0])+ ","
            query += " \"EV_per_EBITDA\" = "                    + str(self.fullTable.iloc[7,0])+ ","
            query += " \"ROE\" = "                              + str(self.fullTable.iloc[8,0])+ ","
            query += " dividend_yield = "                   + str(self.fullTable.iloc[9,0])+ ","
            query += " \"BETA\" = "                             + str(self.fullTable.iloc[10,0])+ ","
            query += " \"revenue_Q\" = "                        + str(int(self.fullTable.iloc[11,0]))+ ","
            query += " \"operating_income_Q\" = "               + str(int(self.fullTable.iloc[12,0]))+ ","
            query += " \"net_income_Q\" = "                     + str(int(self.fullTable.iloc[13,0]))+ ","
            query += " \"controlling_interest_Q\" = "           + str(int(self.fullTable.iloc[14,0]))+ ","
            query += " \"non_controlling_interest_Q\" = "       + str(int(self.fullTable.iloc[15,0]))+ ","
            query += " \"total_assets_Q\" = "                   + str(int(self.fullTable.iloc[16,0]))+ ","
            query += " \"total_stock_holders_Q\" = "            + str(int(self.fullTable.iloc[17,0]))+ ","
            query += " \"controlling_interest_share_Q\" = "     + str(int(self.fullTable.iloc[18,0]))+ ","
            query += " \"non_controlling_interest_share_Q\" = " + str(int(self.fullTable.iloc[19,0]))+ ","
            query += " \"capital_Q\" = "                        + str(int(self.fullTable.iloc[20,0]))+ ","
            query += " \"debt_ratio_Q\" = "                     + str(self.fullTable.iloc[21,0])+ ","
            query += " \"retention_rate_Q\" = "                 + str(self.fullTable.iloc[22,0])+ ","
            query += " \"operating_margin_Q\" = "               + str(self.fullTable.iloc[23,0])+ ","
            query += " \"controlling_interest_rate_Q\" = "      + str(self.fullTable.iloc[24,0])+ ","
            query += " \"ROA_Q\" = "                            + str(self.fullTable.iloc[25,0])+ ","
            query += " \"ROE_Q\" = "                            + str(self.fullTable.iloc[26,0])+ ","
            query += " \"EPS_Q\" = "                            + str(int(self.fullTable.iloc[27,0]))+ ","
            query += " \"BPS_Q\" = "                            + str(int(self.fullTable.iloc[28,0]))+ ","
            query += " \"DPS_Q\" = "                            + str(int(self.fullTable.iloc[29,0]))+ ","
            query += " \"PBR_Q\" = "                            + str(self.fullTable.iloc[30,0])+ ","
            query += " \"outstanding_shares_Q\" = "             + str(int(self.fullTable.iloc[31,0]))+ ","
            query += " \"dividend_yield__Q\" = "                + str(self.fullTable.iloc[32,0])
            query += " where \"finance_date\" = \'" + str(quarterDate) + "\'"
            query += " and \"ticker\" = \'" + str(ticker) + "\'"
    
            db.updateData(conn,query)
            conn.commit()
        db.putConn(conn)
