from tests.index import test, input
test(1)

def partition(n):
  dp = [[] for _ in range(n + 1)]
  dp[0].append([])
  
  for i in range(1, n + 1):
    for j in range(1, i + 1):
      for prev in dp[i - j]:
        dp[i].append(prev + [j])
  
  return dp

  
n, d = map(int, input().split())
partitions = partition(n)

for i in range(len(partitions)):
  p = partitions[i]
  for j in range(len(p)):
    x = {}
    for k in p[j]:
      x[k] = x.get(k, 0) + 1
    partitions[i][j] = x
    
# print(partitions)
a = []
for _ in range(n):
  name, value = input().split()
  a.append((int(value), name))

a.sort()
a += [(10**9,)]


c = {0: []}

l = 0
for row in range(1, n + 1):
  
  x = max(sum(sum([v for v, _ in c[i][-p[i]:]]) for i in p) for p in partitions[row - 1])
  # print(x)
  r = next(i for i in range(l, n + 1) if a[i][0] > d + x)
  c[row] = [a[i] for i in range(l, r)]
  if r == n: break
  l = r
  

ans = [x for i in c for x in c[i]]
  
print(len(ans), sum([len(c[i])*i for i in c]))
print(*sorted(map(lambda x: x[1], ans)), sep='\n')

  
  