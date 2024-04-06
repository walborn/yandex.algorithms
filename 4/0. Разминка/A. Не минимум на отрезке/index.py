# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

n, m = map(int, input().split())
a = list(map(int, input().split()))

def notmin(l, r):
  for i in range(l, r):
    if a[i] != a[i + 1]:
      return a[i] if a[i] > a[i + 1] else a[i + 1]
  return 'NOT FOUND'
  
for _ in range(m):
  l, r = map(int, input().split())
  print(notmin(l, r))
   
