from redis.client import Redis
import redis 
import time
import json

class RedisConnectionPool(object):
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
            print("redis connecting...")
            pool = redis.ConnectionPool(host='3.34.103.188', port=6379, db=0)
            self.r = redis.Redis(connection_pool=pool)
            print("redis address = 3.34.103.188")
            print("redis connected!")
            return True
        except(Exception) as error:
            print("Error while connecting to PostgreSQL", error)
            return False

    def setRedisData(self,key,value):
        res = self.r.set(key, value)
        return res

    def getRedisData(self, key):
        data = self.r.get(key)
        if data is None:
            return None
        res = dict(json.loads(data))
        return res

    def flush(self):
        return self.r.flushall()

if __name__ == "__main__":
    """connection Test Case"""
    rdb = RedisConnectionPool()
    data = rdb.getRedisData('060310')
    if data is None:
        print(None) 
    else:
        print(data)