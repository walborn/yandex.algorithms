# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


n = int(input()) - 1
a = list(map(int, input().split()))

if sum(a) % 2:
  print('+'*n)
else:
  i = 0
  while i < n and a[i] % 2 == a[i+1] % 2:
    i += 1
  print('+'*i + 'x' + '+'*(n - 1 - i))
