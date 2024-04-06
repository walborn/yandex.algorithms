# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


x = 0
for _ in range(int(input())):
  n = int(input())
  x += n // 4
  n %= 4
  if n == 1: x += 1
  elif n == 2: x += 2
  elif n == 3: x += 2
  
print(x)