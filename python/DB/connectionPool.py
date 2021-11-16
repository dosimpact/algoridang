import psycopg2
from psycopg2 import Error
from psycopg2 import pool
from . import identification
import time

from DB.query import dbQuery

class databasepool(dbQuery):
    __postgreSQLpool = []
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):         # Foo 클래스 객체에 _instance 속성이 없다면
            #print("__new__ is called\n")
            cls._instance = super().__new__(cls)  # Foo 클래스의 객체를 생성하고 Foo._instance로 바인딩
        return cls._instance                      # Foo._instance를 리턴

    def __init__(self, mode = 0):
        cls = type(self)
        if not hasattr(cls, "_init"):             # Foo 클래스 객체에 _init 속성이 없다면
            #print("__init__ is called\n")
            cls._init = True
            self.Mode = mode
            cnt = 0
            while not self.__initDB():
                cnt += 1
                time.sleep(1)
                print("connecting... ",cnt ,"/ 100 ")
                if cnt > 100:
                    break
    def __initDB(self):
        try:
            print("postgreSQL connecting...")
            
            self.__postgreSQLpool = psycopg2.pool.SimpleConnectionPool(1, 20, user=identification.ID.user[self.Mode],
                                                            password=identification.ID.password[self.Mode],
                                                            host=identification.ID.host[self.Mode],
                                                            port=identification.ID.port[self.Mode],
                                                            database=identification.ID.database[self.Mode])
            # Create a cursor to perform database operations
    
            print("postgreSQL address = ",identification.ID.host[self.Mode])
            print("postgreSQL connected!")
            return True
        except (Exception, Error) as error:
            print("Error while connecting to PostgreSQL", error)
            return False

    #getConnection
    def getConn(self):
        return self.__postgreSQLpool.getconn()
    #putConnection
    def putConn(self, ps_connection):
        self.__postgreSQLpool.putconn(ps_connection)





if __name__ == "__main__":
    t = databasepool()
    print("test")

    key = t.getConn()
    t.insertIntoData(key, "insert into teststock(ticker, corp_name) values(\'066570\',\'LG전자\');")
    t.insertIntoData(key, "insert into teststock(ticker, corp_name) values(\'005930\',\'삼성전자\');")
    print(t.selectData(key, "select * from teststock"))
    key.commit()
    t.putConn(key)