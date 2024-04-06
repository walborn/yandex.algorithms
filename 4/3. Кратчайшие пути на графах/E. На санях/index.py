from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

import time
start_time = time.time()

from heapq import heappop, heappush

n = int(input()); input()
t, v = zip(*([ (0, 0), (0, 0) ] + [ map(int, input().split()) for _ in range(n - 1)]))


g = [[] for _ in range(n + 1)]
for _ in range(n - 1):
  a, b, s = map(int, input().split())
  g[a].append((b, s))
  g[b].append((a, s))

times = [None, 0] + [None] * n
parents = [() for _ in range(n + 1)]

def gettime(i):
  visited = set()
  ti = float('inf')
  q = [(t[i], i, (i,))]
  pi = ()
  
  while q:
    ta, a, pa = heappop(q)
    
    for b, s in g[a]:
      if b in visited: continue
      visited.add(b)

      tb = ta + s / v[i]

      if times[b] is not None:
        tx = tb + times[b] - (t[b] if v[i] == v[b] else 0)
        px = pa + (parents[b][1:] if v[i] == v[b] else parents[b])
        if tx < ti: ti, pi = tx, px
      
      if tb < ti:
        if b == 1: ti, pi = tb, pa + (1,)
        else: heappush(q, (tb, b, pa))
 
  return ti, pi

tx, px = 0, ()

for i in sorted(range(2, n + 1), key=lambda i: v[i], reverse=True):
  times[i], parents[i] = gettime(i)
  if times[i] > tx: tx, px = times[i], parents[i]


print(tx)
print(*px, 1)
 
print("--- %s seconds ---" % (time.time() - start_time))

# быстрее не запоминать родителей, а найти их потом отдельным проходом
# def getpath(i):
#   visited, path = set(), (i,)
#   q = [(t[i], i)]
  
#   while q:
#     ta, a = heappop(q)
#     for b, s in g[a]:
#       if b in visited: continue

#       tb = ta + s / v[i]
      
#       if b == 1:
#         if tb == times[i]: return path + (b,)
#         continue
      
#       tx = tb + times[b]
#       if v[i] == v[b]:
#         tx -= t[b]
#       if tx < times[i] + 0.000001:
#         if v[i] < v[b]:
#           return path + getpath(b)
      
#       if tb < times[i] + 0.000001:
#         heappush(q, (tb, b))
#       visited.add(b)
    
#   return path
