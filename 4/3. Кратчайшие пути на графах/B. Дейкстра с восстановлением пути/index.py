# A. Не минимум на отрезке
from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None


from math import inf

n, s, f = map(int, input().split())
g = [ list(map(int, input().split())) for _ in range(n) ]

def dijkstra(g, u, n):
  visited = [False] * n
  dist = [inf] * n
  dist[u] = 0 
  parents = [None] * n
  parents[u] = -1
  
  for _ in range(n):
    u = -1
    for v in range(n):
      if not visited[v] and (u == -1 or dist[v] < dist[u]):
        u = v
 
    visited[u] = True
    for v in range(n):
      if g[u][v] != -1 and not visited[v] and dist[v] > dist[u] + g[u][v]:
        dist[v] = dist[u] + g[u][v]
        parents[v] = u
    
  return parents

parents = dijkstra(g, s - 1, n)

i = f - 1
path = []

if parents[i] != None:
  while parents[i] != -1:
    path.append(i)
    i = parents[i]
    
  path.append(s - 1)
else:
  path.append(-2)
  
print(*map(lambda x: x + 1, path[::-1]))