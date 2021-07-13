
import psycopg2
from psycopg2 import Error
from . import identification




class psql(object):
    
    __connection = []
    __cursor = []
    __status = 0

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):         # Foo 클래스 객체에 _instance 속성이 없다면
            print("__new__ is called\n")
            cls._instance = super().__new__(cls)  # Foo 클래스의 객체를 생성하고 Foo._instance로 바인딩
        return cls._instance                      # Foo._instance를 리턴

    def __init__(self):
        cls = type(self)
        if not hasattr(cls, "_init"):             # Foo 클래스 객체에 _init 속성이 없다면
            print("__init__ is called\n")
            cls._init = True
            self.__initDB()

    def __initDB(self):
        try:
            
            
            # Connect to an existing database
            """
            connection = psycopg2.connect(user="postgres",
                                        password="",
                                        host="127.0.0.1",
                                        port="5432",
                                        database="algoridang")
            """

            # self.db = psycopg2.connect(host='133.186.229.72', dbname='main',user='postgres',password='dosimpact',port=5433)
            self.__connection = psycopg2.connect(
                user="postgres",
                password=identification.ID.password,
                host="133.186.229.72",
                port="5433",
                database="main",
            )

            # Create a cursor to perform database operations
            self.__cursor = self.__connection.cursor()
            # Print PostgreSQL details
            print("PostgreSQL server information")
            print(self.__connection.get_dsn_parameters(), "\n")
            # Executing a SQL query
            self.__cursor.execute("SELECT version();")
            # Fetch result
            record = self.__cursor.fetchone()
            print("You are connected to - ", record, "\n")

            self.__status = 1
            return str("Connect with postgresSQL")
        except (Exception, Error) as error:
            print("Error while connecting to PostgreSQL", error)
            return ("Error")
            """
        finally:
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
            """
    def getDBStatus(self):
        if self.__status == 1:
            return "Connected to DB"
        else:
            return "Not connected to DB"

    def insertIntoDataToTable(self, table="", values=""):
        query = "insert into "+str(table)+"values"+str(values)+";"
        print(query)
        self.__cursor.execute(query)
        self.__connection.commit()


    def selectData(self, select ="*", table = "", where = None, ):
        #print(select,table)
        if where == None:
            query = "select " + str(select)+" from " + str(table) +";"
        else:
            query = "select " + str(select)+" from " + str(table) +" where "+str(where)+";"

        self.__cursor.execute(query)
        rows = self.__cursor.fetchall() 
        return rows


if __name__ == "__main__":
    db = psql()
    db2 = psql()

