# мое решение не проходит по времени, см. grok3.py через DSU
from tests.index import test, input
test(10)
from time import time
start_time = time()
# import sys
# input = sys.stdin.readline

# идея:
# поскольку разрезаются все вершины,
# то мы можем пойти от обратного и переделать задачу,
# как будто мы, наоборот, добавляем вершины

# n - count of vertices
# m - count of edges
# k - count of requests
n, m, k = map(int, input().split())
# skip the init, because we will go back from the last request
for _ in range(m): input()

a = [input() for _ in range(k)]
# keep what vertices are in current island
# { islandId: set of vertices }
islands = [None]
# for every vertex find out its island
# initially no one vertex are connected to an island
# { vertex: islandId }
vertices = [0] * n 

    
ans = []
cnt = 0
print(time() - start_time)

for inp in range(k - 1, -1, -1):
  cmd, u, v = a[inp].split()
  u, v = int(u) - 1, int(v) - 1
  x, y = vertices[u], vertices[v]
  
  if cmd == 'ask':
    ans.append('YES' if u == v or x == y and x else 'NO')
  
  if cmd == 'cut':
    if x != y:
      if not x:
        # it is easy if one of u or v
        # is not connected to any island
        islands[y].add(u)
        vertices[u] = y
      elif not y:
        islands[x].add(v)
        vertices[v] = x
      else:
        # if from different islands
        # then first absorb second
        for i in islands[y]: vertices[i] = x
        islands[x].update(islands[y])
    elif not x:
      # if no one connected to any island,
      # then create new island number
      cnt += 1
      islands.append(set([u, v]))
      vertices[u] = vertices[v] = cnt
    
# return chronology
# print('\n'.join(ans[::-1]))      

print(time() - start_time, len(islands), cnt)