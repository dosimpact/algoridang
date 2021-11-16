#import dart_fss as dart
#from numpy.core.numeric import full
#from _Test.opendartAPIkey import key

from DB.connectionPool import databasepool
import requests
import time
from selenium import webdriver
import sys


class financialInformation(object):
    def __init__(self) -> None:
        super().__init__()
        self.fullTable = []

    def getFinancalDataNaver(self, tickers):
        global f
        webdriver_options = webdriver.ChromeOptions()
        #webdriver_options .add_argument('headless')
 
        chromedriver = "E:\\chromedriver.exe"
        driver = webdriver.Chrome(chromedriver,options=webdriver_options )

        
        total = len(tickers)
        idx = 0
        
        for ticker, name in tickers:
            
            f = open("새파일.txt", 'a')
            self.fullTable = []
            idx += 1
            # DB 틀만들기
            #날짜 티커 정보 만들기 
            URL = "https://finance.naver.com/item/coinfo.nhn?code="+ticker+"&target=finsum_more"
            driver.get(URL)
            time.sleep(1)
            self.crowling(driver,ticker)
            print(f"dailyStockData progress ({idx}/{total})")
            f.close()

    def dataAfterTreatment(self,additionalfinanceData, timedata, financeData, ticker):
        self.fullTable.append(timedata[-2][0:-1])       # 0 finance_date
        self.fullTable.append(ticker)                   # 1 ticker
        self.fullTable.append(additionalfinanceData[0]) # 2 시가총액
        self.fullTable.append(financeData[0][3])        # 3 매출액
        self.fullTable.append(financeData[1][3])        # 4 영업이익
        self.fullTable.append(financeData[25][3])       # 5 EPS
        self.fullTable.append(financeData[26][3])       # 6 PER
        self.fullTable.append(additionalfinanceData[2]) # 7 EV/EBITDA
        self.fullTable.append(financeData[21][3])       # 8 ROE
        self.fullTable.append(financeData[30][3])       # 9 배당 수익률
        self.fullTable.append(additionalfinanceData[1]) # 0 beta52
        self.fullTable.append(financeData[0][-2])       # 1 매출액
        self.fullTable.append(financeData[1][-2])       # 2 영업이익
        self.fullTable.append(financeData[4][-2])       # 3 당기순이익
        self.fullTable.append(financeData[5][-2])       # 4 당기순이익(지배)
        self.fullTable.append(financeData[6][-2])       # 5 당기순이익 (비지배)
        self.fullTable.append(financeData[7][-2])       # 6 자산총계
        self.fullTable.append(financeData[9][-2])       # 7 자본총계
        self.fullTable.append(financeData[10][-2])      # 8 자본총계(지배)
        self.fullTable.append(financeData[11][-2])      # 9 자본총계(비지배)
        self.fullTable.append(financeData[12][-2])      # 0 자본금
        self.fullTable.append(financeData[23][-2])      # 1 부채비율
        self.fullTable.append(financeData[24][-2])      # 2 자본유보율
        self.fullTable.append(financeData[19][-2])      # 3 영업이익률
        self.fullTable.append(financeData[20][-2])      # 4 순이익률
        self.fullTable.append(financeData[22][-2])      # 5 ROA
        self.fullTable.append(financeData[21][-2])      # 6 ROE
        self.fullTable.append(financeData[25][-2])      # 7 EPS(원)
        self.fullTable.append(financeData[27][-2])      # 8 BPS(원)
        self.fullTable.append(financeData[29][-2])      # 9 DPS(원)
        self.fullTable.append(financeData[28][-2])      # 0 PBR(원)
        self.fullTable.append(financeData[32][-2])      # 1 발행주식수
        self.fullTable.append(financeData[30][-2])      # 2 배당수익률
        global f
        
        f.write('----------------------------\n')
        f.write(str(self.fullTable))
        f.write('\n')
        f.write('----------------------------\n')
        print(len(self.fullTable))

        
    def crowling(self,driver,ticker):
        try:
            iframe = driver.find_element_by_id('coinfo_cp')
            driver.switch_to_frame(iframe)
            tables = driver.find_elements_by_tag_name('table')
            additionalfinanceData = []

            # 시가총액
            # 01번
            tbodys = tables[1].find_elements_by_tag_name('tbody')
            trs = tbodys[0].find_elements_by_tag_name('tr')
            marketCap = trs[4].find_element_by_tag_name('td').text.replace(',','')
            marketCap = marketCap[0:-2]
            additionalfinanceData.append(marketCap)

            # beta
            beta52 = trs[5].find_element_by_tag_name('td').text.replace(',','')
            additionalfinanceData.append(beta52)

            # EV/EBITDA
            # 05번
            tbodys = tables[5].find_elements_by_tag_name('tbody')
            trs = tbodys[0].find_elements_by_tag_name('tr')
            EVEBITDA = trs[3].find_elements_by_tag_name('td')[0].text.replace(',','')
            additionalfinanceData.append(EVEBITDA)


            # 재무정보
            # 12번 
            timedata = ['구분']
            thead = tables[12].find_element_by_tag_name('thead')
            trs = thead.find_elements_by_tag_name('tr')
            ths = trs[1].find_elements_by_tag_name('th')
            for i in range(len(ths)):
                text = ths[i].text
                text = text[0:4] +'-'+ text[5:7]+'-01'
                if i / 4 > 1:
                    text += 'Q'
                else:
                    text += 'Y'
                timedata.append(text)
                

            res = []
            tbodys = tables[12].find_elements_by_tag_name('tbody')
            trs = tbodys[0].find_elements_by_tag_name('tr')
            for i in range(len(trs)):
                res.append([])
                tds = trs[i].find_elements_by_tag_name('td')
                ths = trs[i].find_elements_by_tag_name('th')
                res[i].append(ths[0].text)
                for j in range(len(tds)):
                    text = tds[j].text.replace(',','')
                    res[i].append(text)

            self.dataAfterTreatment(additionalfinanceData, timedata, res, ticker)
            self.saveDBNaver()
        
        except :

            print(ticker)
            f.write('----------------------------\n')
            f.write(str(ticker)+"has an errror\n" )
            f.write("Unexpected error:" + str(sys.exc_info()[0]))
            f.write('\n')
            f.write('----------------------------\n')
            print("Unexpected error:", sys.exc_info()[0])



    def saveDBNaver(self):
    
        db = databasepool()
        conn = db.getConn()

        for idx in range(len(self.fullTable)):
            val = self.fullTable[idx]
            if val is None or val == ''or val == 'N/A':
                self.fullTable[idx] = 'Null'
                #print(self.fullTable)
        quarterDate = str(self.fullTable[0]) + "T15:30:00+09:00"
        ticker = self.fullTable[1]

        query = "select * from financial_statement where \"finance_date\" =\'"+str(quarterDate)+"\'and \"ticker\" = \'"+str(ticker)+"\'"
        try:
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
                    "+str(self.fullTable[2] )+",\
                    "+str(self.fullTable[3] )+",\
                    "+str(self.fullTable[4] )+",\
                    "+str(self.fullTable[5] )+",\
                    "+str(self.fullTable[6] )+",\
                    "+str(self.fullTable[8] )+",\
                    "+str(self.fullTable[7] )+",\
                    "+str(self.fullTable[9] )+",\
                    "+str(self.fullTable[10])+",\
                    "+str(self.fullTable[11])+",\
                    "+str(self.fullTable[12])+",\
                    "+str(self.fullTable[13])+",\
                    "+str(self.fullTable[14])+",\
                    "+str(self.fullTable[15])+",\
                    "+str(self.fullTable[16])+",\
                    "+str(self.fullTable[17])+",\
                    "+str(self.fullTable[18])+",\
                    "+str(self.fullTable[19])+",\
                    "+str(self.fullTable[20])+",\
                    "+str(self.fullTable[21])+",\
                    "+str(self.fullTable[22])+",\
                    "+str(self.fullTable[23])+",\
                    "+str(self.fullTable[24])+",\
                    "+str(self.fullTable[25])+",\
                    "+str(self.fullTable[26])+",\
                    "+str(self.fullTable[27])+",\
                    "+str(self.fullTable[28])+",\
                    "+str(self.fullTable[29])+",\
                    "+str(self.fullTable[30])+",\
                    "+str(self.fullTable[31])+",\
                    "+str(self.fullTable[32])+")"
                    

                db.insertIntoData(conn,query)
                conn.commit()
                
            else:
                query = "update financial_statement set "
                query += " \"market_cap\" = "                       + str(self.fullTable[2])+ ","
                query += " \"revenue\" = "                          + str(self.fullTable[3])+ ","
                query += " \"operating_income\" = "                 + str(self.fullTable[4])+ ","
                query += " \"EPS\" = "                              + str(self.fullTable[5])+ ","
                query += " \"PER\" = "                              + str(self.fullTable[6])+ ","
                query += " \"EV_per_EBITDA\" = "                    + str(self.fullTable[7])+ ","
                query += " \"ROE\" = "                              + str(self.fullTable[8])+ ","
                query += " \"dividend_yield\" = "                   + str(self.fullTable[9])+ ","
                query += " \"BETA\" = "                             + str(self.fullTable[10])+ ","
                query += " \"revenue_Q\" = "                        + str(self.fullTable[11])+ ","
                query += " \"operating_income_Q\" = "               + str(self.fullTable[12])+ ","
                query += " \"net_income_Q\" = "                     + str(self.fullTable[13])+ ","
                query += " \"controlling_interest_Q\" = "           + str(self.fullTable[14])+ ","
                query += " \"non_controlling_interest_Q\" = "       + str(self.fullTable[15])+ ","
                query += " \"total_assets_Q\" = "                   + str(self.fullTable[16])+ ","
                query += " \"total_stock_holders_Q\" = "            + str(self.fullTable[17])+ ","
                query += " \"controlling_interest_share_Q\" = "     + str(self.fullTable[18])+ ","
                query += " \"non_controlling_interest_share_Q\" = " + str(self.fullTable[19])+ ","
                query += " \"capital_Q\" = "                        + str(self.fullTable[20])+ ","
                query += " \"debt_ratio_Q\" = "                     + str(self.fullTable[21])+ ","
                query += " \"retention_rate_Q\" = "                 + str(self.fullTable[22])+ ","
                query += " \"operating_margin_Q\" = "               + str(self.fullTable[23])+ ","
                query += " \"controlling_interest_rate_Q\" = "      + str(self.fullTable[24])+ ","
                query += " \"ROA_Q\" = "                            + str(self.fullTable[25])+ ","
                query += " \"ROE_Q\" = "                            + str(self.fullTable[26])+ ","
                query += " \"EPS_Q\" = "                            + str(self.fullTable[27])+ ","
                query += " \"BPS_Q\" = "                            + str(self.fullTable[28])+ ","
                query += " \"DPS_Q\" = "                            + str(self.fullTable[29])+ ","
                query += " \"PBR_Q\" = "                            + str(self.fullTable[30])+ ","
                query += " \"outstanding_shares_Q\" = "             + str(self.fullTable[31])+ ","
                query += " \"dividend_yield__Q\" = "                + str(self.fullTable[32])
                query += " where \"finance_date\" = \'" + str(quarterDate) + "\'"
                query += " and \"ticker\" = \'" + str(ticker) + "\'"
        

                db.updateData(conn,query)
                conn.commit()
            db.putConn(conn)
        except:
            f.write('----------------------------\n')
            f.write(str(ticker)+"has an errror\n" )
            f.write("DB write error:" + str(sys.exc_info()[0]))
            f.write('\n')
            f.write(str(self.fullTable))
            f.write('\n')
            f.write('----------------------------\n')
            db.putConn(conn)

