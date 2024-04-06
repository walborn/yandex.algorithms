# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
a = input()
a = list(map(int, a.split())) if a else []

def merge(l, m, r):
  i, j, c = l, m, []
  while i < m and j < r:
    if a[i] < a[j]:
      c.append(a[i])
      i += 1
    else:
      c.append(a[j])
      j += 1
  return c + a[i:m] + a[j:r]

def mergesort(l, r):
  if r - l < 2: return
  m = (l + r) // 2
  mergesort(l, m)
  mergesort(m, r)
  a[l:r] = merge(l, m, r)
  
mergesort(0, n)
print(*a)