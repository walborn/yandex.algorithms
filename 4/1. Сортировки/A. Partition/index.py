# A. Не минимум на отрезке
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
a = list(map(int, input().split()))
x = int(input())

l = len([i for i in a if i < x])
print(l)
print(n - l)
   
