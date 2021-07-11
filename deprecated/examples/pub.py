from processor import add
from time import sleep


# task pub
for i in range(1):
    result = add.apply_async([1, 2])
    print(f"result : {result} {result.ready()}")

# result = add.apply_async([(2, 2), (3, 3), (4, 4)])
# print(f"result : {result.ready()}")
