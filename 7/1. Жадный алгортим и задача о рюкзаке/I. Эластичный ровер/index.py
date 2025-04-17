from tests.index import test, input
test(1)

n, s = map(int, input().split())

a = [(*map(int, input().split()), i) for i in range(1, n + 1) ]
maxP = max(i[2] for i in a)
maxV = min(sum(i[0] for i in a), s + maxP)

a.sort(key=lambda x: x[2], reverse=True) # sort by pressure
a.append((0, 0, -1, 0))

# calculate dp lines
dp = [{0: (0, 0, maxP + 1)}]

for i in range(n):
  d = {j: dp[-1][j][:] for j in dp[-1]}
    
  v, c, p, _ = a[i]
  keys = sorted([j for j in d if j <= s + p - v], reverse=True)
  for j in keys:
    if (j + v) not in d or d[j][1] + c > d[j + v][1]:
      d[j + v] = (i, d[j][1] + c,  p)

  dp.append(d)

# everything is ready to calculate answer

# best volume
j = max(d.keys(), key=lambda i: dp[-1][i][1])

# best cost
c = dp[-1][j][1] 

# best items
r = [] 
while j > 0:
  n = dp[n][j][0]
  v, _, _, idx = a[n]
  r.append(idx)
  j -= v

print(len(r), c)
print(*r)