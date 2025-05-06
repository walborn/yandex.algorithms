def find_set(now):
  copy = now
  while prev[copy] != copy:
    copy = prev[copy]
  while prev[now] != now:
    tmp = prev[now]
    prev[now] = copy
    now = tmp
  return now

def union_sets(a, b):
  a = find_set(a)
  b = find_set(b)
  if a != b:
    if dsu_rank[a] < dsu_rank[b]:
      a, b = b, a
    prev[b] = prev[a]
    if dsu_rank[a] == dsu_rank[b]:
      dsu_rank[a] += 1
    return True
  return False

n, m = map(int, input().split())
prev = list(range(n + 1))
dsu_rank = [1] * (n + 1)
dsu_size = n
for i in range(m):
  a, b = map(int, input().split())
  if union_sets(a, b):
    dsu_size -= 1
    if dsu_size == 1:
      print(i + 1)
      break