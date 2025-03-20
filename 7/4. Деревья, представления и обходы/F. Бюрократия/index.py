from tests.index import test, input
test(2)

import sys
sys.setrecursionlimit(200001)

n = int(input())
a = list(map(lambda i: int(i) - 1, input().split()))
children = [[] for i in range(n)]
for i in range(n - 1):
  children[a[i]].append(i + 1)
  
descendants = [0]*n
def dfs(i):
  descendants[i] = 1 + sum(dfs(j) for j in children[i])
  return descendants[i]

dfs(0)
coins = [0]*n
def dfs2(i):
  coins[i] = 1 + sum((dfs2(j) + descendants[j]) for j in children[i])
  return coins[i]

dfs2(0)

print(*coins)

