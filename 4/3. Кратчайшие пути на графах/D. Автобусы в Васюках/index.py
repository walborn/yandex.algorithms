from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


from collections import defaultdict
import heapq

def dijkstra(g, a, b):
  q = [(0, a)]
  visited, time = set(), { a: 0 }
  while q:
    t, u = heapq.heappop(q)
    
    if u in visited: continue
    if u == b: return t
    
    visited.add(u)
            
    for v, tu, tv in g[u]:
      if v in visited or tu < t: continue
      if tv < time.get(v, float('inf')):
        time[v] = tv
        heapq.heappush(q, (tv, v))
  return -1


n = int(input())
a, b = map(int, input().split())

g = defaultdict(list)
for _ in range(int(input())):
  u, tu, v, tv = map(int, input().split())
  g[u].append((v, tu, tv ))


print(dijkstra(g, a, b))

