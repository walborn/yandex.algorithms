n, k = map(int, input().split())
g = dict()

for y in range(1, k + 1):
  for _ in range(int(input())):
    u, v = map(lambda i: int(i) - 1 + y * n, input().split())
    if u not in g: g[u] = []
    if v not in g: g[v] = []
    g[u].append(v)
    g[v].append(u)

for y in range(1, k + 1):
  for x in range(n):
    v = x + y*n
    if v in g:
      if x not in g: g[x] = []
      g[x].append(v)
      g[v].append(x)

d = [0] * n * (k + 1)

def bfs():
  q, d[0] = [ 0 ], 1
  while len(q):
    v = q.pop(0)
    for u in g[v]:
      if d[u] == 0:
        if u < n:
          if u == n - 1: return d[v]
          d[u] = d[v] + 1
          q.append(u)
        else:
          d[u] = d[v]
          q.insert(0, u)
    del g[v]
  return -1

print(bfs())