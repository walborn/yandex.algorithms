# B. Сложить две дроби
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

rows, cols = map(int, input().split())
a = [None]*rows

for row in range(rows):
  a[row] = list(map(int, input().split()))

m = 0

for row in range(1, rows):
  for col in range(1, cols):
    if a[row][col] and a[row - 1][col - 1] and a[row - 1][col] and a[row][col - 1]:
      a[row][col] += min(a[row - 1][col - 1], a[row - 1][col], a[row][col - 1])
      if a[row][col] > m: m = a[row][col]

print(m)
# for row in range(rows):
#   print(*a[row])
