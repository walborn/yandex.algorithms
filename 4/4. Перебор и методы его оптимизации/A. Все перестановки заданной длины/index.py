# A. Не минимум на отрезке
from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None


n = int(input())

def perm(a, b=''):
  if len(a) == 0: return print(b)
  for i in range(len(a)):
    perm(a[:i] + a[i+1:], b + a[i])
      
perm([ str(i) for i in range(1, n + 1) ])

  