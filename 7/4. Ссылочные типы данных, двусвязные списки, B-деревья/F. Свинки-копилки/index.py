from tests.index import test, input
test(14)

import sys
sys.setrecursionlimit(10**6)

n = int(input())

g = dict()
for v in range(1, n + 1):
  u = int(input())
  if u not in g: g[u] = set()
  if v not in g: g[v] = set()
  g[u].add(v)
  g[v].add(u)
  
visited = set()
def dfs(u):
  if u in visited: return
  visited.add(u)
  for v in g[u]:
    dfs(v)
    
islands = 0
for u in g:
  if u not in visited:
    dfs(u)
    islands += 1
    
print(islands)
