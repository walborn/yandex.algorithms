from tests.index import test, input
from utils import permutations, gen, compare
test(1)

n, s = map(int, input().split())

a = [(*map(int, input().split()), i) for i in range(1, n + 1) ]
maxP = max(i[2] for i in a)
maxV = min(sum(i[0] for i in a), s + maxP)

a.sort(key=lambda x: x[2], reverse=True) # sort by pressure
a = [(0, 0, 0, 0)] + a + [(0, 0, -1, 0)]

dp = [[(-1, 0, maxP + 1) for _ in range(maxV + 1)] for _ in range(n + 1)]
dp[0][0] = (0, 0, maxP + 1)


for i in range(1, n + 1):
  d = dp[i] = [dp[i - 1][j][:] for j in range(maxV + 1)]
    
  v, c, p, _ = a[i]
  for j in range(min(maxV, s + p) - v, -1, -1):
    if d[j][0] != -1 and d[j][1] + c > d[j + v][1]:
      d[j + v] = (i, d[j][1] + c,  p)

bestV = max(range(maxV + 1), key=lambda i: dp[-1][i][1])
bestC = dp[-1][bestV][1]

r = []
i = n + 1
while bestV > 0:
  i = dp[i - 1][bestV][0]
  v, _, _, idx = a[i]
  r.append(idx)
  bestV -= v

print(len(r), bestC)
print(*r)