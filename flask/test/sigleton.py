######https://jroomstudio.tistory.com/41


class Singleton(object):
    def __new__(cls):
        if not hasattr(cls,'instance'):
            print('create')
            cls.instance = super(Singleton, cls).__new__(cls)
        else:
            print('recycle')
        return cls.instance
 
print('1번째 생성')
s1 = Singleton() # create
print('2번째 생성')
s2 = Singleton() # recycle
print('s1 == s2')
print(s1==s2) # true

print('------------------'*5)



class LazyInstantiation:
    _instance = None
    def __init__(self):
        if not LazyInstantiation._instance:
            print('__init__ method called but nothing is created')
        else:
            print('instance already created:', self.getInstance())
 
    @classmethod
    def getInstance(cls):
        if not cls._instance:
            cls._instance = LazyInstantiation()
        return cls._instance
 
# __init__ method called but nothing is created
s = LazyInstantiation()
print(s._instance) # None
# __init__ method called but nothing is created
s1 = LazyInstantiation.getInstance()
s2 = LazyInstantiation.getInstance()
print('s와 s1은 서로 같은 인스턴스인가? -> ',s==s1) # True
print('s1 : ',s1._instance) # <__main__.LazyInstantiation object at 0x03A6B340>
print('s2 : ',s2._instance) # <__main__.LazyInstantiation object at 0x03A6B340>
 
s3 = LazyInstantiation() # instance already created: <__main__.LazyInstantiation object at 0x03A6B340>
print('s3 : ',s3._instance) #  <__main__.LazyInstantiation object at 0x03A6B340>



print('------------------'*5)

class MonostateSingleton:
    __shared_state = {'a':'b'}
    def __init__(self):
        self.__dict__ = self.__shared_state
 
m1 = MonostateSingleton()
m2 = MonostateSingleton()
print(m1) # <__main__.MonostateSingleton object at 0x02C4B0E8>
print(m2) # <__main__.MonostateSingleton object at 0x02C4B118>
 
m1.a = 1
m2.b = 2
print(m1.__dict__) # {'a': 1, 'b': 2}
print(m2.__dict__) # {'a': 1, 'b': 2}x03A6B340>




print('------------------'*5)


class MetaclassSingleton(type):
    _instance = {}
    def __call__(cls,*args,**kwargs):
        if cls not in cls._instance:
            cls._instance[cls] = super(MetaclassSingleton, cls).__call__(*args,*kwargs)
        return cls._instance[cls]
 
class TestMetaclass(metaclass=MetaclassSingleton):
    pass
 
class SecondMetaclass(metaclass=MetaclassSingleton):
    pass
 
t = TestMetaclass()
t1 = TestMetaclass()
print(t) # <__main__.TestMetaclass object at 0x037FB100>
print(t1) # <__main__.TestMetaclass object at 0x037FB100>
 
t2 = SecondMetaclass()
t3 = SecondMetaclass()
print(t2) # <__main__.SecondMetaclass object at 0x037FB310>
print(t3) # <__main__.SecondMetaclass object at 0x037FB310>
print(MetaclassSingleton._instance)
 
