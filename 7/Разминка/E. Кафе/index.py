# A. Не минимум на отрезке
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None


n, k, d = map(int, input().split())

m = (10 * n - 1) // k

if k * (m + 1) // 10 == n:
  print(str(k * (m + 1)) + '0'*(d - 1))
else:
  print(-1)