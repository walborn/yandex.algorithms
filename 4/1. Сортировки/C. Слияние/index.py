# A. Не минимум на отрезке
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
a = input()
a = list(map(int, a.split())) if a else []
m = int(input())
b = input()
b = list(map(int, b.split())) if b else []


def merge(n, a, m, b):
  i, j, c = 0, 0, []
  while i < n and j < m:
    if a[i] < b[j]:
      c.append(a[i])
      i += 1
    else:
      c.append(b[j])
      j += 1
  return c + a[i:] + b[j:]

print(*merge(n, a, m, b))