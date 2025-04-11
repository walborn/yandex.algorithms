from tests.index import test, input
test(1)

n, k = map(int, input().split())
rows = [[] for _ in range(k)]
lens = [0]

for i in range(1, n + 1):
  w, j = map(int, input().split())
  lens.append(w)
  rows[j - 1].append((w, i))
  
m = sum([ w for w, i in rows[0] ])
a = [True] * (m + 1)

d = []
for row in rows:
  b = [0] + [-1] * m
  for w, i in row:
    for j in range(m - w, -1, -1):
      if b[j] != -1 and b[j + w] == -1:
        b[j + w] = i
  
  a = [i and j != -1 for i, j in zip(a, b)]
  d.append(b)

try:
  i = a.index(True, 1, -1)
  ans = []
  for b in d:
    j = i
    while j != 0:
      ans.append(b[j])
      j -= lens[b[j]]
    
  print('YES')
  print(*ans)
except ValueError:
  print('NO')