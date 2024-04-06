from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

from collections import defaultdict
import heapq

def dijkstra(g, a, b):
  q = [(0, a)]
  visited, dist = set(), { a: 0 }
  while q:
    du, u = heapq.heappop(q)
    
    if u in visited: continue
    if u == b: return du
    
    visited.add(u)
            
    for v, dv in g[u]:
      if v in visited: continue
      if du + dv < dist.get(v, float('inf')):
        dist[v] = du + dv
        heapq.heappush(q, (dist[v], v))
  return -1


n, k = map(int, input().split())

g = defaultdict(list)
for _ in range(k):
  v, u, l = map(int, input().split())
  g[v].append((u, l))
  g[u].append((v, l))

a, b = map(int, input().split())

print(dijkstra(g, a, b))