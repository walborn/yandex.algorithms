# A. Не минимум на отрезке
from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None

p, v = map(int, input().split())
q, m = map(int, input().split())

if p > v: p, v, q, m = q, m, p, v

if p + v >= q - m: print(max(q + m, p + v) - min(q - m, p - v) + 1)
else: print(2 * (v + m + 1))


