# A. Не минимум на отрезке
from tests.index import test, input
test(0)

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
  
  for _ in range(n):
    u = -1
    for v in range(n):
      if not visited[v] and (u == -1 or dist[v] < dist[u]):
        u = v
 
    visited[u] = True
    for v in range(n):
      if g[u][v] != -1 and not visited[v] and dist[v] > dist[u] + g[u][v]:
        dist[v] = dist[u] + g[u][v]
    
  return dist

dist = dijkstra(g, s - 1, n)[f - 1]
print(-1 if dist == inf else dist)