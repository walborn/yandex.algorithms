# A. Не минимум на отрезке
from tests.index import test, input
test(4)

__input__ = input
def input():
  try: return __input__()
  except: return None



l, a, v, b, u = map(int, input().split())

def time(a, v, b, u):
  if a > l/2: a, v = l - a, -v
  if b > l/2: b, u = l - b, -u

  if a == b: return 0
  if v == 0 and u == 0: return -1
  

  # сделаем так, что a будет тот, что ближе к 0
  if a > b: a, v, b, u = b, u, a, v
  
  if v >= 0:
    # 1. наврстечу друг другу или один из них стоит
    if u <= 0:
      return (b - a) / (v - u)
    
    # 2. a догоняет b
    if u > 0:
      ta = (l/2 - a) / v if v != 0 else 10**9
      tb = (l/2 - b) / u
      if ta < tb: return (b - a) / (v - u)
      # return (a + tb * v, v, l/2, -u)
      return tb + time(a + tb * v, v, l/2, -u)

  if v < 0:
    # 3. b догоняет a
    if u <= 0:
      return time(l/2 - a, -v, l/2 - b, -u)

    # 4. в разные стороны
    if u > 0:
      ta = a / -v
      tb = (l/2 - b) / u
      if ta <= tb: return ta + time(0, -v, b + u * ta, u)
      return tb + time(a + v * tb, v, l/2, -u)

t = time(a, v, b, u)
if t == -1: print('NO')
else: print('YES', t, sep='\n')


