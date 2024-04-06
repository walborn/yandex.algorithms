# B. Сложить две дроби
from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
a = list(map(int, input().split()))

b = [0] + a[:]
for i in range(1, n + 1): b[i] += b[i - 1]

print(*[ a[i] * (2 * i - n) - 2 * b[i] + b[-1] for i in range(n) ])