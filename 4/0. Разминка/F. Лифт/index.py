# B. Сложить две дроби
from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None
  

import math
k, n = int(input()), int(input())
a = [ int(input()) for _ in range(n) ]

r, p, j = 0, 0, 0

for i in range(n - 1, -1, -1):
  if a[i]:
    if p >= a[i]:
      p -= a[i]
    else:
      m = a[i] - p
      r += (i + 1) * math.ceil(m / k)
      p = (k - m % k) % k
    
print(2 * r)
