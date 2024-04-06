from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None


n, x, y = int(input()), [], []

for _ in range(n):
  i, j = map(int, input().split())
  y.append(i)
  x.append(j)
  
x = sorted(x)

mid = len(x) // 2

costx = sum([ abs(i - x[mid]) for i in x ])

y = sorted(y)
costy = sum([ abs(i + 1 - y[i]) for i in range(n) ])
  
print(costx + costy)

  