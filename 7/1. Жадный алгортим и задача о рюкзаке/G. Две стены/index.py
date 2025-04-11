# нужно выбирать PyPy иначе не проходит по времени
from tests.index import test, input
test(17)
import time
start = time.time()

n, k = map(int, input().split())
rows = [[] for _ in range(k)]
lens = [0]

for i in range(1, n + 1):
  w, j = map(int, input().split())
  lens.append(w)
  rows[j - 1].append((w, i))
  
m = sum([ w for w, i in rows[0] ])
a = [True] * (m + 1)

d, c = [], m - 1
for row in rows:
  b = [0] + [-1] * m
  for w, i in row:
    for j in range(m - w, -1, -1):
      if b[j] != -1 and b[j + w] == -1:
        b[j + w] = i
  
  for i in range(1, m):
    if a[i] and b[i] == -1:
      a[i] = False
      c -= 1
  
  if not c: break   
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
  
print("--- %s seconds ---" % (time.time() - start))