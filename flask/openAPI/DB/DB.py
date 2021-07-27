import psycopg2
from psycopg2 import Error
from psycopg2 import pool
from . import identification

import pandas.io.sql as pandsql


class databasepool(object):
    __postgreSQLpool = []

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):         # Foo 클래스 객체에 _instance 속성이 없다면
            #print("__new__ is called\n")
            cls._instance = super().__new__(cls)  # Foo 클래스의 객체를 생성하고 Foo._instance로 바인딩
        return cls._instance                      # Foo._instance를 리턴

    def __init__(self):
        cls = type(self)
        if not hasattr(cls, "_init"):             # Foo 클래스 객체에 _init 속성이 없다면
            #print("__init__ is called\n")
            cls._init = True
            self.__initDB()
    def __initDB(self):
        try:
            print("DB connecting...")
            self.__postgreSQLpool = psycopg2.pool.SimpleConnectionPool(1, 20, user="postgres",
                                                            password=identification.ID.password,
                                                            host="133.186.229.72",
                                                            port="5433",
                                                            database="main")
            # Create a cursor to perform database operations
    
            print("address = 133.186.229.72\n")
            print("DB connected!")
            return str("Connect with postgresSQL")
        except (Exception, Error) as error:
            print("Error while connecting to PostgreSQL", error)
            return ("Error")

    def getConn(self):
        return self.__postgreSQLpool.getconn()

    def putConn(self, ps_connection):
        self.__postgreSQLpool.putconn(ps_connection)
    #teststock 에 태스트 수행 할 것
    def insertIntoData(self, ps_connection, query):
        
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
dbinit = databasepool()


if __name__ == "__main__":
    t = databasepool()
    print("test")

    key = t.getConn()
    t.insertIntoData(key,"insert into teststock(ticker, corp_name) values(\'066570\',\'LG전자\');")
    t.insertIntoData(key,"insert into teststock(ticker, corp_name) values(\'005930\',\'삼성전자\');")
    print(t.selectData(key, "select * from teststock"))
    key.commit()
    t.putConn(key)