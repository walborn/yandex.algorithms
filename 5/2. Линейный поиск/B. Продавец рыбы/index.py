from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

n, k = map(int, input().split())
p = list(map(int, input().split()))

maxProfit = 0

for i in range(1, n):
  profit = p[i] - min(p[max(0, i - k): i])
  if profit > maxProfit:
    maxProfit = profit


print(maxProfit)
    


