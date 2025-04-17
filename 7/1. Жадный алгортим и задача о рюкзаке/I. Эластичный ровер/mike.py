from tests.index import test, input
from utils import permutations, gen, compare
test(1)

n, s = map(int, input().split())

a = [] # volume, cost, pressure, number
V = 0 # total volume
P = 0 # max pressure

for j in range(1, n + 1):
  v, c, p = map(int, input().split())
  a.append((v, c, p, j))
  V += v
  P = max(P, p)

a.sort(reverse=True, key=lambda x: x[2]) # sort by pressure
a = [(0, 0, 0, 0)] + a + [(0, 0, -1, 0)]

V = min(V, s + P)

dp = [[[-1, 0, P + 1] for _ in range(V + 1)] for _ in range(n + 1)]
dp[0][0][0] = 0
  
for i in range(1, n + 1):
  for j in range(V + 1):
    dp[i][j] = dp[i - 1][j][:]
  v, c, p, _ = a[i]
  d = dp[i]
  
  for j in range(min(V - v, s + p - v), -1, -1):
    if d[j][0] == -1: continue
    if d[j][1] + c > d[j + v][1] and j + v <= V:
      d[j + v][0] = j
      d[j + v][1] = d[j][1] + c
      d[j + v][2] = p
  
W = 0 # best volume
for j in range(V + 1):
  if dp[-1][j][1] > dp[-1][W][1]:
    W = j

r = []
w = W
i = n
print(a)
for i in range(n + 1):
  print(dp[i])
  
while w > 0:
  print(i, w)
  
  i = dp[i][w][0]
  v, c, p, idx = a[i]
  r.append(idx)
  i -= 1
  w -= v

print(len(r), dp[-1][W][1])
print(*r)