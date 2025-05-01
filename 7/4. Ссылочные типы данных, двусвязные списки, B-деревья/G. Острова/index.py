from tests.index import test, input
test(3)

g = dict()
visited = set()

def dfs(u):
  if u in visited: return
  visited.add(u)
  for v in g[u]:
    dfs(v)
    
n, m = map(int, input().split())
u, v = map(int, input().split())
g[u] = set([v])
g[v] = set([u])
dfs(u)

i = 1
while i < m and len(visited) < n:
  i += 1
  u, v = map(int, input().split())
  if u not in g: g[u] = set()
  if v not in g: g[v] = set()
  g[u].add(v)
  g[v].add(u)
  
  if u in visited: dfs(v)
  elif v in visited: dfs(u)
  
print(i)
  
