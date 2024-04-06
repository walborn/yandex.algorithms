# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

import random

n = int(input())
a = list(map(int, input().split())) if n else []

def partition(l, r, x):
  e, g = l, l
  for n in range(l, r):
    if a[n] < x: a[n], a[g], a[e], e, g = a[g], a[e], a[n], e + 1, g + 1
    elif a[n] == x: a[n], a[g], g = a[g], a[n], g + 1

  return e, g

def qsort(a, l = 0, r = len(a)):
  if l == r: return
  e, g = partition(l, r, a[random.randint(l, r - 1)])
  qsort(a, l, e)
  qsort(a, g, r)
  
qsort(a)
print(*a)