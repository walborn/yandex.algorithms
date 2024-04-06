from collections import deque

x = int(input())
z = int(input())
p = int(input())


def bfs(x, y, z):
  q = deque([(x, y, z, 0)])
  visited = set()

  while q:
    x, y, z, r = q.popleft()
    if x <= 0 or y > 1.618 * x: continue
    if x >= y + z: return r + 1
    
    if (x, y, z) in visited: continue
    visited.add((x, y, z))
    
    # i - сколько мы тратим на солдат противника
    i, j = max(0, x - z), min(x, y)
    q.append((x - (y - i), y - i + p * int(z > x - i), z - (x - i), r + 1))
    q.append((x - (y - j), y - j + p * int(z > x - j), z - (x - j), r + 1))

  return -1



print(bfs(x, 0, z))