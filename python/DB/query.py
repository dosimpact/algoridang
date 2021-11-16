
import pandas.io.sql as pandsql

class dbQuery():    
    #dbconnction으로 분리할것
    def insertIntoData(self, ps_connection, query):
        
        if (ps_connection):
            ps_cursor = ps_connection.cursor()
            ps_cursor.execute(query)
            ps_cursor.close()
            
    def updateData(self, ps_connection, query):
        
        if (ps_connection):
            ps_cursor = ps_connection.cursor()
            ps_cursor.execute(query)
            ps_cursor.close()

    def deleteData(self, ps_connection, query):
        
        if (ps_connection):
            ps_cursor = ps_connection.cursor()
            ps_cursor.execute(query)
            ps_cursor.close()

  
    def selectData(self, ps_connection, query):
        
        if (ps_connection):
            
            ps_cursor = ps_connection.cursor()
            ps_cursor.execute(query)
            rows = ps_cursor.fetchall() 
            ps_cursor.close()

            return rows
        return "error"

    def selectDataframe(self, ps_connection, query):
        
        if (ps_connection):
            
            ps_cursor = ps_connection.cursor()
            df = pandsql.read_sql(query,ps_connection)
            ps_cursor.close()

            return df
        return "error"