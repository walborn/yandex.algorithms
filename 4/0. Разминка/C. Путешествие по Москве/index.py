# B. Сложить две дроби
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None
  
  
from math import atan2, pi

a, b, x, y = map(int, input().split())

r, t = (a**2 + b**2)**.5, (x**2 + y**2)**.5

f = abs(atan2(b, a) - atan2(y, x))

print(min(r + t, min(f, 2 * pi - f) * min(r, t) + abs(r - t)))